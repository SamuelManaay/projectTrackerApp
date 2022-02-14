import json
import os, json
from unittest import result
from flask.json import jsonify
# from pymongo import MongoClient
from flask import Flask, request, jsonify

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

app = Flask(__name__)

host = os.environ['ME_CONFIG_POSTGRES_SERVER'] if 'ME_CONFIG_POSTGRES_SERVER' in os.environ else "localhost"
port = os.environ['ME_CONFIG_POSTGRES_PORT'] if 'ME_CONFIG_POSTGRES_PORT' in os.environ else 5432
username = os.environ['ME_CONFIG_POSTGRES_AUTH_USERNAME'] if 'ME_CONFIG_POSTGRES_AUTH_USERNAME' in os.environ else "postgres"
password = os.environ['ME_CONFIG_POSTGRES_AUTH_PASSWORD'] if 'ME_CONFIG_POSTGRES_AUTH_PASSWORD' in os.environ else "postgres"
base = declarative_base()


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




@app.route('/adduser', methods=['POST'])
def add_user():
    _json = request.json
    operationalTarget = _json['operationalTarget']
    tablename = _json['table']
    database = _json['db']
    
    Connection = tableConnection(tablename)
    db_engine = dbConnection(database)
    session = dbsession(db_engine)
    for doc in operationalTarget:
        data = Connection(document=doc)
        session.add(data)
        session.commit()
    return jsonify("test")


if __name__ == '__main__' :
    app.run(debug=True)