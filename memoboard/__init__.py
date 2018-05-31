"""
Everything that needs to be set up to get flask running is initialized in this file.

  * set up and configure the app
  * start the database (db)
  * load all (!) models used (essential to create the database using db_create)
  * load all (!) controllers
  * load api
  * Set up blueprints

"""
from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy

from flask_marshmallow import Marshmallow
from flask_htmlmin import HTMLMIN
from flask_restful import Api
from flask_compress import Compress

db = SQLAlchemy()
htmlmin = HTMLMIN()
ma = Marshmallow()
compress = Compress()
api = Api()


def create_app(config):
    # Set up app, database and login manager before importing models and controllers
    # Important for db_create script

    app = Flask(__name__)

    app.config.from_object(config)

    db.app = app
    db.init_app(app)

    ma.init_app(app)

    # Enable Compress

    compress.init_app(app)

    # Enable HTMLMIN
    htmlmin.init_app(app)

    from memoboard.models import MemoList, MemoItem

    from memoboard.controllers import main

    # Flask-Restful api
    from memoboard.api_resources import MemoListsResource, MemoListResource
    from memoboard.api_resources import MemoListItemsResource, MemoListItemResource

    api_bp = Blueprint('api', __name__)
    api.init_app(api_bp)

    # Register Blueprints
    app.register_blueprint(main)
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
