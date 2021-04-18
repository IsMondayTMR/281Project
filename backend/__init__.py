from flask import Flask
from flask_restful import Resource, Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
import pymysql
import secrets
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
conn = "mysql+pymysql://{0}:{1}@{2}/{3}".format(secrets.dbuser, secrets.dbpass, secrets.dbhost, secrets.dbname)
app.config['SQLALCHEMY_DATABASE_URI'] = conn
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = secrets.jwtsecret


db = SQLAlchemy(app)

api = Api(app)
jwt = JWTManager(app)


# this line must be here
from backend import routes
# this line must be here
db.create_all()