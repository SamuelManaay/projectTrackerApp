

import json
import os, json
from unittest import result
from flask.json import jsonify
# from pymongo import MongoClient

#=============================
#FLASK
import sqlalchemy
from sqlalchemy import *
from sqlalchemy.sql.elements import Null
from sqlalchemy.sql.functions import count
from sqlalchemy_utils import database_exists, create_database

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.engine.url import URL
from sqlalchemy import inspect
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, String, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from sqlalchemy.ext.mutable import MutableDict
from copy import deepcopy #added in new update
from sqlalchemy.pool import NullPool
import collections.abc #added in new update
from itertools import product
import itertools
import re
import traceback
import ast
import uuid

# from openapi_server import util
# from openapi_server.views import response

host = os.environ['ME_CONFIG_POSTGRES_SERVER'] if 'ME_CONFIG_POSTGRES_SERVER' in os.environ else "localhost"
port = os.environ['ME_CONFIG_POSTGRES_PORT'] if 'ME_CONFIG_POSTGRES_PORT' in os.environ else 5432
username = os.environ['ME_CONFIG_POSTGRES_AUTH_USERNAME'] if 'ME_CONFIG_POSTGRES_AUTH_USERNAME' in os.environ else "postgres"
password = os.environ['ME_CONFIG_POSTGRES_AUTH_PASSWORD'] if 'ME_CONFIG_POSTGRES_AUTH_PASSWORD' in os.environ else "postgres"
connection = {}

_lastmodified = '_lastmodified'
CannotUpt = False
base = declarative_base()
total = []
ReturnDataFinal = ''
def dbConnection(db):
    db_engine = create_engine("postgresql://postgres:sam072394@localhost/" + str(db) + "",
                   poolclass=NullPool)
    return db_engine
    
def dbsession(dbEngine):
    session = sessionmaker(bind=dbEngine)()
    # session = Session()
    return session

def tableConnection(tablename):
    class table(base):
        load_instance = True
        __tablename__= tablename
        __table_args__ = {'extend_existing': True}
        _id = Column(UUID(as_uuid=True),primary_key=True,server_default=sqlalchemy.text("gen_random_uuid()"))
        # _id = Column(VARCHAR)
        document =Column(JSON)
        _lastmodified =Column(DateTime, default=func.current_timestamp())
        _created =Column(DateTime, default=func.current_timestamp())
    return table

def updatedata(d, u):
    for k, v in u.items():
        if isinstance(v, collections.abc.Mapping):
            d[k] = updatedata(d.get(k, {}), v)
        else:
            d[k] = v
    return d


list_of_keys_to_keep = ['_id','_lastmodifiedFrom', '_lastmodifiedTo', '_createdFrom','_createdTo']
list_of_keys_to_keepLM = ['_lastmodifiedFrom', '_lastmodifiedTo']
list_of_keys_to_keepCRTD = ['_createdFrom','_createdTo']
list_of_keys_to_keepID = ['_id']
def remove_fields(d, list_of_keys_to_keep):
    return {key: value for key, value in d.items() if key in list_of_keys_to_keep}

def dict_depth(dic, level = 1):
    if not isinstance(dic, dict) or not dic:
        return level
    return max(dict_depth(dic[key], level + 1)
               for key in dic)
   
def is_valid_uuid(val):
    try:
        uuid.UUID(str(val))
        return True
    except ValueError:
        return False

                
def rc(d, k):
    if type(d[k]) == dict:
        nk = list(d[k].keys())[0]
        return f"->'{k}'"+rc(d[k], nk)
    else:
        return f"->>'{k}' ilike '%{d[k]}%'"              
           
def get_values(d):
    for v in d.values():
        if isinstance(v, dict):
            yield from get_values(v)
        else:
            yield v


             
def add_item(dic,keydata, key, value):
    if key in dic:
        dic[keydata][key].append(value)
    else:
        dic[key] = [value]
    return dic

def thingy(aDictionaryArray):
  alreadyFound = []
  result = []
  for item in aDictionaryArray:
    if item in alreadyFound:
      if item not in result:
        result += [item]
    alreadyFound += [item]
  return result

def adddb(Sess,Conn,dict1):
    data = Conn(document = dict1)
    Sess.add(data)
    Sess.flush()
    dataId = data._id
    Sess.commit()
    Sess.close()
    return str(dataId)

def deldb(Sess,id, Conn, data):
    existing = data
    if not existing:
        return False
    try:
        Sess.delete(existing)
        Sess.commit()
        return {"deleted":id}
    except Exception as e:
        Sess.rollback()
        return "Deletion of _id " +str(id) + " failed due to: "+ str(e)
def searchqry(params2,session, tablename, type):
    # print(type,'searchqry')
    totalList1 = []
    permutations = [dict(zip(params2, v)) for v in product(*params2.values())]
    for permutation in permutations:
        if type == 'created':
            sql = "select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where date(_created) between"
        elif type == 'lastmodified':   
            sql = "select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where date(_lastmodified) between"
        for count, item in enumerate(list(permutation.items())):
            if count:
              sql += "AND "
            sql += f"  '{item[1]}' "
        results = sqlalchemy.text(sql)
        results1 = session.execute(results)
        results2 = results1.mappings().all()
        totalList1 += results2
        return totalList1
 
 

def searchEmp(database,tablename):
    glo = []
    totalList1 = []
    db_engine = dbConnection(database)
    session = dbsession(db_engine)
    results = sqlalchemy.text("select (CAST(_id as VARCHAR)),document ,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename))
    results1 = session.execute(results)
    results2 = results1.mappings().all()
    for i in range(len(results2)):
        tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
        glo.append(tempDict)
    totalList1 += glo
    return jsonify(totalList1)

def searchEmpID(database,tablename, empID):
    glo = []
    totalList1 = []
    db_engine = dbConnection(database)
    session = dbsession(db_engine)
    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(empID) +"%'")
    results1 = session.execute(results)
    results2 = results1.mappings().all()
    for i in range(len(results2)):
        tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
        glo.append(tempDict)
    return jsonify(glo)

   
def search(database,tablename,condition,limit,offset,auth_info,headers):
    isDeepSearching = False
    withBlankParams = False   
    conditionkeys = []
    collection = []
    match = []
    glo = []
    glo1 = []

  

    db_engine = dbConnection(database)
    session = dbsession(db_engine)
    
    
    data = []
    results = ""
    # print(condition,"Condition here")
    
       
    if condition is None:
        results = sqlalchemy.text("select (CAST(_id as VARCHAR)),document ,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename))
        results1 = session.execute(results)
        results2 = results1.mappings().all()
        for i in range(len(results2)):
            tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
            glo.append(tempDict)
  

    elif condition == {}:
        results = sqlalchemy.text("select (CAST(_id as VARCHAR)),document ,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename))
        results1 = session.execute(results)
        results2 = results1.mappings().all()
        for i in range(len(results2)):
            tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
            glo.append(tempDict)
        
    else:
        # print(3)
        empty_keys = [k for k,v in condition.items() if not v]
        if empty_keys != []:
            # print(1)
            for k in empty_keys:
                del condition[k]
            if all(value == [] for value in condition.values()):
                results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename))
                results1 = session.execute(results)
                results2 = results1.mappings().all()
                for i in range(len(results2)):
                    tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
                    glo.append(tempDict)
            else :
                # print(3)
                temp = [ ]
                for key in condition.keys():
                    if condition[key] == ['']: temp.append(key)
                if temp == []:
                    # print(4)
                    withBlankParams = True
                    latestval = []
                    totalList1 = []
                    List=[]
                    params1 = deepcopy(condition)
                    params = deepcopy(condition)
                    hasnodata = False
                    hasdata = False
                    for item in params1.keys():
                        if item in list_of_keys_to_keep:
                            hasdata = True
                        else:
                            hasnodata = True
                    if hasdata == True:
                        for k,v in condition.items():
                            if str(k) == "_id":
                                newData = remove_fields(params1, list_of_keys_to_keepID)
                                for var in v:
                                    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                                    results1 = session.execute(results)
                                    results2 = results1.mappings().all()
                                    copydata = results2
                            elif str(k) in  ["_lastmodifiedFrom","_lastmodifiedTo" ]:
                                newData = remove_fields(params1, list_of_keys_to_keepLM)
                                lenNewData = len(newData)
                                if lenNewData == 1:
                                    for key,value in newData.items():
                                        for var in value:
                                            if str(key) == "_createdFrom":
                                                results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) <= '" + str(var) +"'")
                                            elif str(key) == "_createdTo":
                                                results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) >= '" + str(var) +"'")
                                            results1 = session.execute(results)
                                            results2 = results1.mappings().all()
                                            copydata = results2
                                else:
                                    methodtype = 'lastmodified'
                                    copydata =  searchqry(newData,session, tablename, methodtype)
                            elif str(k) in ["_createdFrom", "_createdTo"]:
                                newData = remove_fields(params1, list_of_keys_to_keepCRTD)
                                lenNewData = len(newData)
                                if lenNewData == 1:
                                    for key,value in newData.items():
                                        for var in value:
                                            if str(key) == "_createdFrom":
                                                results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) <= '" + str(var) +"'")
                                            elif str(key) == "_createdTo":
                                                results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) >= '" + str(var) +"'")
                                            results1 = session.execute(results)
                                            results2 = results1.mappings().all()
                                            copydata = results2
                                else:
                                    methodtype = 'created'
                                    copydata =  searchqry(newData,session, tablename, methodtype)
                            latestval += copydata
                        # newData = remove_fields(params1, list_of_keys_to_keep)
                        # for k,v in newData.items():
                        #     for var in v:
                        #         if str(k) == "_id":
                        #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                        #         elif str(k) == "_lastmodifiedFrom":
                        #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) >= '" + str(var) +"'")
                        #         elif str(k) == "_lastmodifiedTo":
                        #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) <= '" + str(var) +"'")
                        #         elif str(k) == "_createdFrom":
                        #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) >= '" + str(var) +"'")
                        #         elif str(k) == "_createdTo":
                        #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) <= '" + str(var) +"'")
                        #         results1 = session.execute(results)
                        #         results2 = results1.mappings().all()
                        #         latestval += results2
                        #         print(latestval)
                    if hasnodata == True:
                            params2 = deepcopy(params)
                            if '_id' in params2 :
                                del params2['_id']
                            if '_lastmodifiedFrom' in params2 :
                                del params2['_lastmodifiedFrom']
                            if '_lastmodifiedTo' in params2 :
                                del params2['_lastmodifiedTo']    
                            if '_createdFrom' in params2 :
                                del params2['_createdFrom']
                            if '_createdTo' in params2 :
                                del params2['_createdTo']
                            permutations = [dict(zip(params2, v)) for v in product(*params2.values())]
                            for permutation in permutations:
                                sql = "select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where "
                                for count, item in enumerate(list(permutation.items())):
                                    if count:
                                      sql += "AND "
                                    sql += f" document->> '{item[0]}' like '%{item[1]}%' "
                                results = sqlalchemy.text(sql)
                                print(results)
                                results1 = session.execute(results)
                                results2 = results1.mappings().all()
                                totalList1 += results2
                                for i in totalList1:
                                  if i not in List:    
                                    List.append(i)
                    if latestval == []:
                        filterdata = List
                    else:
                        filterdata = [x for x in latestval if x in List]
                    for i in range(len(filterdata)):
                        tempDict = {"_id": filterdata[i]["_id"], "_lastmodified": filterdata[i]["_lastmodified"], "_created": filterdata[i]["_created"], **filterdata[i]["document"]}
                        glo.append(tempDict)   

                else:

                    for key in temp:
                        del condition[key]
                        if condition == {}:
                            print(6)
                            results = sqlalchemy.text("select  (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename))
                            results1 = session.execute(results)
                            results2 = results1.mappings().all()
                            for i in range(len(results2)):
                                tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
                                glo.append(tempDict)

                        else:
                            print(7)
                            withBlankParams = True
                            latestval = []
                            totalList1 = []
                            List = []
                            params1 = deepcopy(condition)
                            params = deepcopy(condition)
                            hasnodata = False
                            hasdata = False
                            for item in params1.keys():
                                if item in list_of_keys_to_keep:
                                    hasdata = True
                                else:
                                    hasnodata = True
                            if hasdata == True:
                                for k,v in condition.items():
                                    if str(k) == "_id":
                                        newData = remove_fields(params1, list_of_keys_to_keepID)
                                        for var in v:
                                            results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                                            results1 = session.execute(results)
                                            results2 = results1.mappings().all()
                                            copydata = results2
                                    elif str(k) in  ["_lastmodifiedFrom","_lastmodifiedTo" ]:
                                        newData = remove_fields(params1, list_of_keys_to_keepLM)
                                        lenNewData = len(newData)
                                        if lenNewData == 1:
                                            for key,value in newData.items():
                                                for var in value:
                                                    if str(key) == "_createdFrom":
                                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) <= '" + str(var) +"'")
                                                    elif str(key) == "_createdTo":
                                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) >= '" + str(var) +"'")
                                                    results1 = session.execute(results)
                                                    results2 = results1.mappings().all()
                                                    copydata = results2
                                        else:
                                            methodtype = 'lastmodified'
                                            copydata =  searchqry(newData,session, tablename, methodtype)
                                    elif str(k) in ["_createdFrom", "_createdTo"]:
                                        newData = remove_fields(params1, list_of_keys_to_keepCRTD)
                                        lenNewData = len(newData)
                                        if lenNewData == 1:
                                            for key,value in newData.items():
                                                for var in value:
                                                    if str(key) == "_createdFrom":
                                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) <= '" + str(var) +"'")
                                                    elif str(key) == "_createdTo":
                                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) >= '" + str(var) +"'")
                                                    results1 = session.execute(results)
                                                    results2 = results1.mappings().all()
                                                    copydata = results2
                                        else:
                                            methodtype = 'created'
                                            copydata =  searchqry(newData,session, tablename, methodtype)
                                    latestval += copydata
                                # print()
                                # newData = remove_fields(params1, list_of_keys_to_keep)
                                # for k,v in newData.items():
                                #     for var in v:
                                #         if str(k) == "_id":
                                #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                                #         elif str(k) == "_lastmodifiedFrom":
                                #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) >= '" + str(var) +"'")
                                #         elif str(k) == "_lastmodifiedTo":
                                #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) <= '" + str(var) +"'")
                                #         elif str(k) == "_createdFrom":
                                #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) >= '" + str(var) +"'")
                                #         elif str(k) == "_createdTo":
                                #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) <= '" + str(var) +"'")
                                #         results1 = session.execute(results)
                                #         results2 = results1.mappings().all()
                                #         latestval += results2
                                #         print(latestval)
                            if hasnodata == True:
                                    params2 = deepcopy(params)
                                    if '_id' in params2 :
                                        del params2['_id']
                                    if '_lastmodifiedFrom' in params2 :
                                        del params2['_lastmodifiedFrom']
                                    if '_lastmodifiedTo' in params2 :
                                        del params2['_lastmodifiedTo']    
                                    if '_createdFrom' in params2 :
                                        del params2['_createdFrom']
                                    if '_createdTo' in params2 :
                                        del params2['_createdTo']

                                    permutations = [dict(zip(params2, v)) for v in product(*params2.values())]
                                    for permutation in permutations:
                                        sql = "select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where "
                                        for count, item in enumerate(list(permutation.items())):
                                            if count:
                                              sql += "AND "
                                            sql += f" document->> '{item[0]}' like '%{item[1]}%' "
                                        results = sqlalchemy.text(sql)
                                        print(results)
                                        results1 = session.execute(results)
                                        results2 = results1.mappings().all()
                                        totalList1 += results2
                                        for i in totalList1:
                                            if i not in List:    
                                                List.append(i)
                            if latestval == []:
                                filterdata = List
                            else:
                                filterdata = [x for x in latestval if x in List]
                            for i in range(len(filterdata)):
                                tempDict = {"_id": filterdata[i]["_id"], "_lastmodified": filterdata[i]["_lastmodified"], "_created": filterdata[i]["_created"], **filterdata[i]["document"]}
                                glo.append(tempDict)   
                            # for k,v in condition.items():
                            #     print(k)
                            #     print(v)
                            #     for var in v :
                            #         results = ""
                            #         if str(k) == "_id":
                            #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                            #         elif str(k) == "_lastmodified":
                            #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _lastmodified::text LIKE '%" + str(var) +"%'")
                            #         elif str(k) == "_created":
                            #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _created::text LIKE '%" + str(var) +"%'")
                            #         else :    
                            #             results = sqlalchemy.text("select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where document->> '"+ str(k)+"' like '%" + str(var) +"%'")
                            #         # results = sqlalchemy.text("select x as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where document->> '"+ str(k)+"' like '" + str(var) +"%'")
                            #         results1 = session.execute(results)
                            #         results2 = results1.mappings().all()
                            #         for i in range(len(results2)):
                            #             tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
                            #             glo.append(tempDict)

        else:
            print(8)
            if all(value == [''] for value in condition.values()):
                print(9)
                results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename))
                results1 = session.execute(results)
                results2 = results1.mappings().all()
                for i in range(len(results2)):
                    tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
                    glo.append(tempDict)
            else :
                print(10)
                temp = []
                nested = []
                total = []
                for key in condition.keys():
                    if condition[key] == ['']: temp.append(key)
                if temp == []:
                    print(12)
                   
                    for k,v in condition.items():
                        nested = dict_depth(v)
                        if nested <= 1:
                            latestval = []
                            totalList1 = []
                            params1 = deepcopy(condition)
                            params = deepcopy(condition)
                            hasnodata = False
                            hasdata = False
                            for item in params1.keys():
                                if item in list_of_keys_to_keep:
                                    hasdata = True
                                else:
                                    hasnodata = True
                            if hasdata == True:
                                lenNewData = 0
                                copydata = []
                                if str(k) == "_id":
                                    newData = remove_fields(params1, list_of_keys_to_keepID)
                                    for var in v:
                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                                        results1 = session.execute(results)
                                        results2 = results1.mappings().all()
                                        copydata = results2
                                elif str(k) in  ["_lastmodifiedFrom","_lastmodifiedTo" ]:
                                    newData = remove_fields(params1, list_of_keys_to_keepLM)
                                    lenNewData = len(newData)
                                    if lenNewData == 1:
                                        for key,value in newData.items():
                                            for var in value:
                                                if str(key) == "_createdFrom":
                                                    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) <= '" + str(var) +"'")
                                                elif str(key) == "_createdTo":
                                                    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) >= '" + str(var) +"'")
                                                results1 = session.execute(results)
                                                results2 = results1.mappings().all()
                                                copydata = results2
                                    else:
                                        methodtype = 'lastmodified'
                                        copydata =  searchqry(newData,session, tablename, methodtype)
                                elif str(k) in ["_createdFrom", "_createdTo"]:
                                    newData = remove_fields(params1, list_of_keys_to_keepCRTD)
                                    lenNewData = len(newData)
                                    if lenNewData == 1:
                                        for key,value in newData.items():
                                            for var in value:
                                                if str(key) == "_createdFrom":
                                                    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) <= '" + str(var) +"'")
                                                elif str(key) == "_createdTo":
                                                    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) >= '" + str(var) +"'")
                                                results1 = session.execute(results)
                                                results2 = results1.mappings().all()
                                                copydata = results2
                                    else:
                                        methodtype = 'created'
                                        copydata =  searchqry(newData,session, tablename, methodtype)
                                latestval += copydata
                                # print(latestval)
                                
                                # for var in v:
                                #     if str(k) == "_id":
                                #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                                #     elif str(k) == "_lastmodifiedFrom":
                                #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) >= '" + str(var) +"'")
                                #     elif str(k) == "_lastmodifiedTo":
                                #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) <= '" + str(var) +"'")
                                #     elif str(k) == "_createdFrom":
                                #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) <= '" + str(var) +"'")
                                #     elif str(k) == "_createdTo":
                                #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) >= '" + str(var) +"'")
                                #     results1 = session.execute(results)
                                #     results2 = results1.mappings().all()
                                #     latestval += results2
                                #     print(latestval)
                            if hasnodata == True:
                                    params2 = deepcopy(params)
                                    if '_id' in params2 :
                                        del params2['_id']
                                    if '_lastmodifiedFrom' in params2 :
                                        del params2['_lastmodifiedFrom']
                                    if '_lastmodifiedTo' in params2 :
                                        del params2['_lastmodifiedTo']    
                                    if '_createdFrom' in params2 :
                                        del params2['_createdFrom']
                                    if '_createdTo' in params2 :
                                        del params2['_createdTo']

                                    permutations = [dict(zip(params2, v)) for v in product(*params2.values())]
                                    for permutation in permutations:
                                        sql = "select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where "
                                        for count, item in enumerate(list(permutation.items())):
                                            if count:
                                              sql += "AND "
                                            sql += f" document->> '{item[0]}' like '%{item[1]}%' "
                                        results = sqlalchemy.text(sql)
                                        results1 = session.execute(results)
                                        results2 = results1.mappings().all()
                                        totalList1 += results2
                            if latestval == []:
                                filterdata = totalList1
                            elif totalList1 == []:
                                filterdata = latestval
                            else:
                                filterdata = [x for x in latestval if x in totalList1]
                            for i in range(len(filterdata)):
                                tempDict = {"_id": filterdata[i]["_id"], "_lastmodified": filterdata[i]["_lastmodified"], "_created": filterdata[i]["_created"], **filterdata[i]["document"]}
                                glo.append(tempDict)

                            # print(13)
                            # for var in v :
                            #     if str(k) == "_id":
                            #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                            #     elif str(k) == "_lastmodifiedFrom":
                            #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _lastmodified >= '" + str(var) +"'")
                            #     elif str(k) == "_lastmodifiedTo":
                            #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _lastmodified <= '" + str(var) +"'")
                            #     elif str(k) == "_createdFrom":
                            #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _created >= '" + str(var) +"'")
                            #     elif str(k) == "_createdTo":
                            #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _created <= '" + str(var) +"'")
                            #     else :    
                            #         results = sqlalchemy.text("select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where document->> '"+ str(k)+"' like '%" + str(var) +"%'")
                            #     print(results)
                            #     results1 = session.execute(results)
                            #     results2 = results1.mappings().all()
                            #     for i in range(len(results2)):
                            #         tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
                            #         glo.append(tempDict)
                        else :
                            print(14)
                            if type(v) == dict:
                                details = list(get_values(v))
                                isDeepSearching = True
                                for y in details:
                                    for x in y:
                                        newdata = "'" + x + "'"
                                        data = re.sub("[\(\[].*?[\)\]]", "", str(v))
                                        substr = "}"
                                        for i in range(len(str(data))):
                                            if data[i] == substr:
                                                data = data[:i] + str(newdata) + data[i:]
                                                break
                                        col = "{'"+ str(k) + "'" +':'+ str(data)+ "}"
                                        col1 = col.replace("'", "\"")
                                        print(col1)
                                        val2 = rc(json.loads(col1), list(json.loads(col1).keys())[0])
                                        # print(value, "VALUE HERE")
                                        # val1 = str(value).replace("['", "")
                                        
                                        # val2 = val1.replace("']","")
                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,CAST(_lastmodified as VARCHAR), CAST(_created as VARCHAR) from " +  str(tablename) + " where document" + str(val2))
                                        print(results)
                                        results1 = session.execute(results)
                                        results2 = results1.mappings().all()

                                        for i in range(len(results2)):
                                            tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
                                            glo.append(tempDict)

                else:
                    for key in temp:
                        del condition[key]
                        if condition == {}:
                            print(15)
                            results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename))
                            results1 = session.execute(results)
                            results2 = results1.mappings().all()
                            for i in range(len(results2)):
                                tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
                                glo.append(tempDict)
                        else:
                            print(16)
                            latestval = []
                            totalList1 = []
                            params1 = deepcopy(condition)
                            params = deepcopy(condition)
                            hasnodata = False
                            hasdata = False
                            for item in params1.keys():
                                if item in list_of_keys_to_keep:
                                    hasdata = True
                                else:
                                    hasnodata = True
                            if hasdata == True:
                                # newData = remove_fields(params1, list_of_keys_to_keep)
                                for k,v in condition.items():
                                    if str(k) == "_id":
                                        newData = remove_fields(params1, list_of_keys_to_keepID)
                                        for var in v:
                                            results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                                            results1 = session.execute(results)
                                            results2 = results1.mappings().all()
                                            copydata = results2
                                    elif str(k) in  ["_lastmodifiedFrom","_lastmodifiedTo" ]:
                                        newData = remove_fields(params1, list_of_keys_to_keepLM)
                                        lenNewData = len(newData)
                                        if lenNewData == 1:
                                            for key,value in newData.items():
                                                for var in value:
                                                    if str(key) == "_createdFrom":
                                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) <= '" + str(var) +"'")
                                                    elif str(key) == "_createdTo":
                                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) >= '" + str(var) +"'")
                                                    results1 = session.execute(results)
                                                    results2 = results1.mappings().all()
                                                    copydata = results2
                                        else:
                                            methodtype = 'lastmodified'
                                            copydata =  searchqry(newData,session, tablename, methodtype)
                                    elif str(k) in ["_createdFrom", "_createdTo"]:
                                        newData = remove_fields(params1, list_of_keys_to_keepCRTD)
                                        lenNewData = len(newData)
                                        if lenNewData == 1:
                                            for key,value in newData.items():
                                                for var in value:
                                                    if str(key) == "_createdFrom":
                                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) <= '" + str(var) +"'")
                                                    elif str(key) == "_createdTo":
                                                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) >= '" + str(var) +"'")
                                                    results1 = session.execute(results)
                                                    results2 = results1.mappings().all()
                                                    copydata = results2
                                        else:
                                            methodtype = 'created'
                                            copydata =  searchqry(newData,session, tablename, methodtype)
                                    latestval += copydata
                                    # for var in v:
                                    #     if str(k) == "_id":
                                    #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                                    #     elif str(k) == "_lastmodifiedFrom":
                                    #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) >= '" + str(var) +"'")
                                    #     elif str(k) == "_lastmodifiedTo":
                                    #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) <= '" + str(var) +"'")
                                    #     elif str(k) == "_createdFrom":
                                    #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) >= '" + str(var) +"'")
                                    #     elif str(k) == "_createdTo":
                                    #         results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) <= '" + str(var) +"'")
                                    #     results1 = session.execute(results)
                                    #     results2 = results1.mappings().all()
                                    #     latestval += results2
                                    #     print(latestval)
                            if hasnodata == True:
                                    params2 = deepcopy(params)
                                    if '_id' in params2 :
                                        del params2['_id']
                                    if '_lastmodifiedFrom' in params2 :
                                        del params2['_lastmodifiedFrom']
                                    if '_lastmodifiedTo' in params2 :
                                        del params2['_lastmodifiedTo']    
                                    if '_createdFrom' in params2 :
                                        del params2['_createdFrom']
                                    if '_createdTo' in params2 :
                                        del params2['_createdTo']

                                    permutations = [dict(zip(params2, v)) for v in product(*params2.values())]
                                    for permutation in permutations:
                                        sql = "select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where "
                                        for count, item in enumerate(list(permutation.items())):
                                            if count:
                                              sql += "AND "
                                            sql += f" document->> '{item[0]}' like '%{item[1]}%' "
                                        results = sqlalchemy.text(sql)
                                        results1 = session.execute(results)
                                        results2 = results1.mappings().all()
                                        totalList1 += results2
                            if latestval == []:
                                filterdata = totalList1
                            else:
                                filterdata = [x for x in latestval if x in totalList1]
                            for i in range(len(filterdata)):
                                tempDict = {"_id": filterdata[i]["_id"], "_lastmodified": filterdata[i]["_lastmodified"], "_created": filterdata[i]["_created"], **filterdata[i]["document"]}
                                glo.append(tempDict)
                                
                                # for k,v in condition.items():
                                    
                                #     for var in v :
                                #         results = ""
                                #         if str(k) == "_id":
                                #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                                #         elif str(k) == "_lastmodified":
                                #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _lastmodified::text LIKE '%" + str(var) +"%'")
                                #         elif str(k) == "_created":
                                #             results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _created::text LIKE '%" + str(var) +"%'")
                                #         else :    
                                #             results = sqlalchemy.text("select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where document->> '"+ str(k)+"' like '" + str(var) +"%'")
                                #         # results = sqlalchemy.text("select x as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where document->> '"+ str(k)+"' like '%" + str(var) +"%'")
                                #         results1 = session.execute(results)
                                #         results2 = results1.mappings().all()
                                #         for i in range(len(results2)):
                                            
                                #             tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
                                #             glo.append(tempDict)
                                            
    

    
    List = []     
    sample = [] 
    checker = False
    if condition is None:
        print("one")
        for s in glo:
            print(s)
            sample.append(s)
    else:
        for k, v in condition.items(): 
            if type(v) == dict: 
                checker = True


        if all(value == [''] for value in condition.values()):
            print("two")
            for s in glo:
                sample.append(s)
        elif checker == True:
            print("two point 1")
            for i in condition.keys():
                match.append(i)

            for s in glo:
                if glo.count(s) >= len(match):
                    if s not in sample:
                        sample.append(s)
        else:
            print("three")
            if withBlankParams == True:
                for s in glo:
                    sample.append(s)
            else:    
                for i in condition.values():
                    match.append(i)
                for s in glo:
                    if glo.count(s) >= len(match):   
                        if s not in sample:
                            sample.append(s)
                for i in glo:
                   if i not in List:    
                     List.append(i)
    
    # print(List, "LIST HERE")

    results = ""
    params = deepcopy(condition)
    params1 = deepcopy(condition)
    latestval = []
    totalList1 = []   
    hasdata = False
    hasnodata = False
    filterdata = []
    valToTotal = []
    print(sample, "sample here")
    if condition is None:

        filterdata += sample
        # results = sqlalchemy.text("select (CAST(_id as VARCHAR)), (CAST(document as VARCHAR)),(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename))
        # results1 = session.execute(results)
        # results2 = results1.mappings().all()
        # for i in range(len(results2)):
        #     tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
        #     latestval.append(tempDict)
        #     filterdata = latestval

    elif condition == {}:
        filterdata += sample
        # filterdata = len(sample)
        # results = sqlalchemy.text("select (CAST(_id as VARCHAR)),document ,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename))
        # results1 = session.execute(results)
        
        # results2 = results1.mappings().all()
        # for i in range(len(results2)):
        #     tempDict = {"_id": results2[i]["_id"], "_lastmodified": results2[i]["_lastmodified"], "_created": results2[i]["_created"], **results2[i]["document"]}
        #     latestval.append(tempDict)
        #     filterdata = latestval
    elif isDeepSearching == True:
        filterdata += sample
        
    else:
        conditionparams = False
        for item in params1.keys():
            if item in list_of_keys_to_keep:
                hasdata = True
            else:
                hasnodata = True
        if hasdata == True:
            conditionparams = True
            for k,v in condition.items():
                if str(k) == "_id":
                    newData = remove_fields(params1, list_of_keys_to_keepID)
                    for var in v:
                        results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where _id::text LIKE '%" + str(var) +"%'")
                        results1 = session.execute(results)
                        results2 = results1.mappings().all()
                        copydata = results2
                elif str(k) in  ["_lastmodifiedFrom","_lastmodifiedTo" ]:
                    newData = remove_fields(params1, list_of_keys_to_keepLM)
                    lenNewData = len(newData)
                    if lenNewData == 1:
                        for key,value in newData.items():
                            for var in value:
                                if str(key) == "_createdFrom":
                                    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) <= '" + str(var) +"'")
                                elif str(key) == "_createdTo":
                                    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_lastmodified) >= '" + str(var) +"'")
                                results1 = session.execute(results)
                                results2 = results1.mappings().all()
                                copydata = results2
                    else:
                        methodtype = 'lastmodified'
                        copydata =  searchqry(newData,session, tablename, methodtype)
                elif str(k) in ["_createdFrom", "_createdTo"]:
                    newData = remove_fields(params1, list_of_keys_to_keepCRTD)
                    lenNewData = len(newData)
                    if lenNewData == 1:
                        for key,value in newData.items():
                            for var in value:
                                if str(key) == "_createdFrom":
                                    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) <= '" + str(var) +"'")
                                elif str(key) == "_createdTo":
                                    results = sqlalchemy.text("select (CAST(_id as VARCHAR)), document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename) + " where date(_created) >= '" + str(var) +"'")
                                results1 = session.execute(results)
                                results2 = results1.mappings().all()
                                copydata = results2
                    else:
                        methodtype = 'created'
                        copydata =  searchqry(newData,session, tablename, methodtype)
                latestval += copydata

        if hasnodata == True:
            params2 = deepcopy(params)
            if '_id' in params2 :
                del params2['_id']
            if '_lastmodifiedFrom' in params2 :
                del params2['_lastmodifiedFrom']
            if '_lastmodifiedTo' in params2 :
                del params2['_lastmodifiedTo']    
            if '_createdFrom' in params2 :
                del params2['_createdFrom']
            if '_createdTo' in params2 :
                del params2['_createdTo']
            permutations = [dict(zip(params2, v)) for v in product(*params2.values())]
            for permutation in permutations:
                sql = "select x::text as _id, document,(CAST(_lastmodified as VARCHAR)) AS \"" + "_lastmodified" + "\", CAST(_created as VARCHAR) from " + str(tablename)+ " jsonb_to_recordset(x) where "
                for count, item in enumerate(list(permutation.items())):
                    if count:
                      sql += "AND "
                    sql += f" document->> '{item[0]}' like '%{item[1]}%' "
                results = sqlalchemy.text(sql)
                results1 = session.execute(results)
                results2 = results1.mappings().all()
                totalList1 += results2

        if latestval == []:
            filterdata = totalList1
        elif totalList1 == []:
            filterdata = latestval
        else:
            # filterdata = [x for x in latestval if x in totalList1]
            for i in totalList1:
                if i in latestval:
                    filterdata.append(i)


    totalCount = len(filterdata)
    print(totalCount,"TOTAL HIT")
    session.close()    
    sample.sort(key = lambda x:x["_created"], reverse=True)
    total = len(sample)
    total = sample[:limit]
    for skip in total[offset:]:
        collection.append(skip)
    if len(sample) > 0 :  
        rplcqt = json.dumps(collection)    
        result= json.loads(rplcqt)
    else:
        result = []
    
    return jsonify(result)



def upsert(operation, _id, doc,  Connection, session,data, CannotUpt = False):

    if '_id' in doc :
        del doc['_id']
    if _lastmodified in doc :
        del doc[_lastmodified]
    
    try:
        if operation in [10, 11] :
            if len(_id) > 0:
                if not data is None:
                    if CannotUpt == False:
                        dbdata = deepcopy(data.document)
                        doc1 = deepcopy(doc)
                        updatedData = updatedata(dbdata,doc1)
                        data.document = updatedData
                        try:
                            session.commit()
                        except Exception as e:
                            session.rollback()
                            session.flush()
                        finally:
                            session.expunge_all()
                            session.close()
                        ReturnData = {"updated":_id}
                        return ReturnData
                    else:
                        # util.logger.warning(doc) 
                        return False
                else :
                    dataID = adddb(session,Connection,doc)
                    ReturnData = {"created":dataID}
                    return ReturnData
            else:
                dataID = adddb(session,Connection,doc)
                ReturnData = {"created":dataID}
                return ReturnData
        if operation in [20] :
            dataID = adddb(session,Connection,doc)
            ReturnData = {"created":dataID}
            return ReturnData
        if operation in [30, 31] :
            print(data.document, "data docs")
            dbdata = deepcopy(data.document)
            doc1 = deepcopy(doc)
            updatedData = updatedata(dbdata,doc1)
            data.document = updatedData
            try:
               session.commit()
            except Exception as e:
                session.rollback()
                session.flush() 
            finally:
                session.expunge_all()
                session.close()
            ReturnData = {"updated":_id}
            return ReturnData
        if operation in [40, 41]:
            result = deldb(session,_id, Connection, data)
            return result
    except Exception as e:
        # util.logger.warning(doc)
        # util.logger.warning(e)
        return False

def operate(app, database, tablename, operation, operationTarget,Authinfo, Headers):

    # util.logger.info('search : operate')
    errors = []
    resltMsg = []
    Connection = tableConnection(tablename)
    db_engine = dbConnection(database)
    session = dbsession(db_engine)
    
    if not database_exists(db_engine.url):
        create_database(db_engine.url)
        session.execute("CREATE TABLE public."+ str(tablename) +"( _id uuid NOT NULL DEFAULT gen_random_uuid(), document jsonb, _lastmodified timestamp with time zone, _created timestamp with time zone DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "+ str(tablename)+ "_key PRIMARY KEY (_id))")
        session.execute("CREATE OR REPLACE FUNCTION public.lastmodified() RETURNS trigger LANGUAGE 'plpgsql' VOLATILE NOT LEAKPROOF AS $BODY$ BEGIN NEW._lastmodified := current_timestamp; RETURN NEW; END; $BODY$;")
        session.execute("CREATE TRIGGER " + str(tablename) +"_lastmodified BEFORE INSERT OR UPDATE ON public."+ str(tablename) +" FOR EACH ROW EXECUTE PROCEDURE public.lastmodified();")
        # util.logger.info("Database Created Successfully")
    else:
        insp = sqlalchemy.inspect(db_engine)
        if insp.has_table(tablename) == False:
            session.execute("CREATE TABLE public."+ str(tablename) +"( _id uuid NOT NULL DEFAULT gen_random_uuid(), document jsonb, _lastmodified timestamp with time zone, _created timestamp with time zone DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "+ str(tablename)+ "_key PRIMARY KEY (_id))")
            session.execute("CREATE OR REPLACE FUNCTION public.lastmodified() RETURNS trigger LANGUAGE 'plpgsql' VOLATILE NOT LEAKPROOF AS $BODY$ BEGIN NEW._lastmodified := current_timestamp; RETURN NEW; END; $BODY$;")
            session.execute("CREATE TRIGGER " + str(tablename) +"_lastmodified BEFORE INSERT OR UPDATE ON public."+ str(tablename) +" FOR EACH ROW EXECUTE PROCEDURE public.lastmodified();") 
            # util.logger.info("Table Created Successfully")
    

    for doc in operationTarget :
        _id = {}
        _lastModified ={}
        newLastModified = {}
        if '_created' in doc:
            del doc['_created']
        if '_id' in doc:
            _id = doc['_id']
        if len(_id) > 0:
            checker = is_valid_uuid(_id)
            if checker:
                data = session.query(Connection).get(_id)
                if not data is None:
                    if operation in [10, 30, 40] and _lastmodified in doc :
                        _lastModified = data._lastmodified
                        lastmod = str(_lastModified).split('+')
                        updatedLM = lastmod[0]
                        updatedLMv2 = updatedLM.split('.')
                        updatedLMv3 = updatedLMv2[1]
                        if int(repr(int(updatedLMv3))[-1]) != 0 :
                            newLastModified = str(updatedLM)
                        else :
                            s = str(updatedLM)
                            updtd = s.rstrip('0')
                            newLastModified = updtd
                        docLastMod = str(doc[_lastmodified]).split('+')
                        if str(newLastModified) == str(docLastMod[0]):
                            resltMsg1 = upsert(operation, _id, doc,  Connection, session,data, CannotUpt= False)
                            if resltMsg1 == False:
                                errors.append(doc)
                                # util.logger.warning(doc)
                            else:
                                resltMsg.append(resltMsg1)
                        else:
                            errormsg = "Optimistic logic in doc:" + str(_lastModified) + " req:" + doc[_lastmodified] + " in "+ str(doc)
                            errors.append(errormsg)
                            # util.logger.warning(doc)
                            app.logger.warning("Failed due to optimistic logic  doc:" + str(_lastModified) + " req:" + doc[_lastmodified])
                    elif operation in [10,20] and _lastmodified not in doc:
                        CannotUpt = True
                        resltMsg1 = upsert(operation, _id, doc,  Connection, session,data, CannotUpt= False)
                        if resltMsg1 == False:
                            errors.append(doc)
                            # util.logger.warning(doc)
                        else:
                            resltMsg.append(resltMsg1)
                    elif operation in [11, 20, 31, 41]:
                        resltMsg1 = upsert(operation, _id, doc,  Connection, session,data, CannotUpt= False)
                        if resltMsg1 == False:
                            errors.append(doc)
                            # util.logger.warning(doc)
                        else:
                            resltMsg.append(resltMsg1)
                    elif operation not in [10, 11, 20, 30, 31, 40, 41]:
                        errors.append(doc)
                        # util.logger.warning(doc)
                else:
                    if operation in [10, 11, 20]:
                        CannotUpt = True
                        resltMsg1 = upsert(operation, _id, doc, Connection,session,None, CannotUpt)
                        if resltMsg1 == False:
                            errors.append(doc)
                            # util.logger.warning(doc)
                        else:
                            resltMsg.append(resltMsg1)
                    elif operation in [30, 31, 40, 41]:
                        errors.append(doc)
                        # util.logger.warning(doc)
                    elif operation not in [10, 11, 20, 30, 31, 40, 41]:
                        errors.append(doc)
                        # util.logger.warning(doc)
                    else:
                        errors.append(doc)
                        # util.logger.warning(doc)
            else:
                if operation in [10, 11, 20]:
                    CannotUpt = True
                    resltMsg1 = upsert(operation, _id, doc,  Connection, session,None, CannotUpt= False)
                    if resltMsg1 == False:
                        errors.append(doc)
                        # util.logger.warning(doc)
                    else:
                        resltMsg.append(resltMsg1)
                elif operation in [30, 31, 40, 41]:
                    errors.append(doc)
                    # util.logger.warning(doc)
                elif operation not in [10, 11, 20, 30, 31, 40, 41]:
                    errors.append(doc)
                    # util.logger.warning(doc)
        else:
            if operation in [10, 11, 20]:
                CannotUpt = True
                resltMsg1 = upsert(operation, _id, doc ,  Connection, session,None, CannotUpt= False)
                if resltMsg1 == False:
                    errors.append(doc)
                    # util.logger.warning(doc)
                else:
                    resltMsg.append(resltMsg1)
            elif operation in [30, 31, 40, 41]:
                errors.append(doc)
                # util.logger.warning(doc)
            elif operation not in [10, 11, 20, 30, 31, 40, 41]:
                errors.append(doc)
                # util.logger.warning(doc)
            else:
                errors.append(doc)
                # # util.logger.warning(doc)
    checker1 = False
    checker2 = False
    keys = {"created", "updated", "deleted"}
    new = {}
    for item in resltMsg:
        for k, v in item.items():
            if k in keys:
                new.setdefault(k, []).append(v)
    if new:
        checker1 = True
    
    if errors != []:
        checker2 = True
        errmsg = {"Failed operation":errors}
        new.update(errmsg)

    if checker1 == True and checker2 == False:
        status = "Done"
    elif checker1 == False and checker2 == True:
        status = "Failed"   
    else:
        status = "Partial Failed"  
    if status in ["Done","Partial Failed"]:
        res = jsonify(str(new), str(status))
    else:
        res = jsonify(str(new))
    res = jsonify(str(new))
    return res



