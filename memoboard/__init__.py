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
from flask.ext.sqlalchemy import SQLAlchemy

from flask_htmlmin import HTMLMIN
from flask_restful import Api

db = SQLAlchemy()
htmlmin = HTMLMIN()
api = Api()


def create_app(config):
    # Set up app, database and login manager before importing models and controllers
    # Important for db_create script

    app = Flask(__name__)

    app.config.from_object(config)

    db.app = app
    db.init_app(app)

    # Enable HTMLMIN
    htmlmin.init_app(app)

    from memoboard.models import MemoList, MemoItem

    from memoboard.controllers import main

    # Flask-Restful api
    from memoboard.api_resources import MemoListsResource, MemoListResource
    from memoboard.api_resources import MemoListItemsResource, MemoListItemResource

    api_bp = Blueprint('api', __name__)
    api.init_app(api_bp)

    api.add_resource(MemoListsResource, '/lists', endpoint='lists')
    api.add_resource(MemoListResource, '/lists/<int:list_id>', endpoint='list')
    api.add_resource(MemoListItemsResource, '/lists/<int:list_id>/items', endpoint='list_items')
    api.add_resource(MemoListItemResource, '/lists/<int:list_id>/items/<int:item_id>', endpoint='list_item')

    # Register Blueprints
    app.register_blueprint(main)
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
