import connexion
import os, json
import six
from flask import Flask, jsonify, request 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.engine.url import URL
from sqlalchemy import *
from flask_migrate import Migrate
# from openapi_server.models.operate_req import OperateReq  # noqa: E501
# from openapi_server.models.operate_res import OperateRes  # noqa: E501
# from openapi_server.models.search_res import SearchRes  # noqa: E501
# from openapi_server import util
import microservice
# from application import app
# from database import db
import json
import urllib.parse
import traceback
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)



app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()





@app.route('/search', methods=['GET'])
@cross_origin()
# def database_table_get(database, table, condition=None, limit=None, offset=None, auth_info=None):  # noqa: E501
def database_table_get():  # noqa: E501
    _json = request.json
    database = _json['database']
    table = _json['table']
    condition =_json['condition']
    limit = _json['limit']
    offset = _json['offset']
    auth_info = _json['auth_info']
    headers = _json['headers']
    

    res = None

    try:

        if "AuthInfo" in connexion.request.headers:
            AuthInfo = json.loads(urllib.parse.unquote(connexion.request.headers["AuthInfo"]))
        else:
            AuthInfo =  None

        res = microservice.search(database
                                 ,table
                                 ,condition
                                 ,limit
                                 ,offset
                                 ,auth_info
                                 ,connexion.request.headers)
    except Exception as e:

        res = jsonify(e.args[0])


    app.logger.debug(str(res))
    return res



@app.route('/searchEmp', methods=['POST'])
@cross_origin()
def database_table_get_Emp(): 
    
    _json = request.json
    print(_json)
    database = _json['database']
    
    table = _json['table']
    
    res = None

    try:
        res = microservice.searchEmp(database ,table)
    except Exception as e:
        res = jsonify(e.args[0])
    app.logger.debug(str(res))
    # res = 'test'
    return res


@app.route('/searchEmpID', methods=['POST'])
@cross_origin()
def database_table_get_EmpID(): 
    
    _json = request.json
    print(_json)
    database = _json['database']
    empID = _json['empID']
    table = _json['table']
    
    res = None

    try:
        res = microservice.searchEmpID(database ,table, empID)
    except Exception as e:
        res = jsonify(e.args[0])
    app.logger.debug(str(res))
    # res = 'test'
    return res



@app.route('/operate_req', methods=['POST'])
def database_tablename_post():  # noqa: E501
    _json = request.json
    database = _json['database']
    table = _json['table']
    operation = _json['operation']
    
    print(database, "db")
    print(table,"tb")
    print(operation,"operation")
    """database_table_post

    WebAPIデータ操作インタフェース # noqa: E501

    :param database: 接続先のdatabase名を設定する
    :type database: str
    :param table: 接続先のtable名を設定する
    :type table: str
    :param operate_req: 
    :type operate_req: dict | bytes
    :param auth_info: 認証情報 URLエンコードしたString値を設定する
    :type auth_info: str

    :rtype: OperateRes
    """

    res = None

    try:
        if not connexion.request.is_json:
            raise ValueError("request body is not json")

        operate_req = connexion.request.get_json()
       
        operation = operate_req["operation"]
        operationTarget = operate_req["operationTarget"]
        print(operationTarget,"operation target")
        if "AuthInfo" in connexion.request.headers:
            AuthInfo = json.loads(urllib.parse.unquote(connexion.request.headers["AuthInfo"]))
        else:
            AuthInfo =  None

        res = microservice.operate(
                                  app, 
                                  database, 
                                  table, 
                                  operation, 
                                  operationTarget, 
                                  AuthInfo, 
                                  connexion.request.headers)
    except Exception as e:
        app.logger.warning(traceback.format_exc())
        res = jsonify(e.args[0])

    app.logger.debug(res)
    return res

if __name__ == '__main__':
    app.run(debug=True)


