"""
Everything that needs to be set up to get flask running is initialized in this file.

  * set up and configure the app
  * start the database (db)
  * load LoginManager (for user system)
  * start Flask Debug Toolbar
  * load all (!) models used (essential to create the database using db_create)
  * load all (!) controllers and register their blueprints to a subdomain
  * add admin panel

  * set up global things like the search form and custom 403/404 error messages
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

    app.register_blueprint(main)

    from memoboard.api_resources import MemoListResource

    api_bp = Blueprint('api', __name__)
    api = Api(api_bp)

    api.add_resource(MemoListResource, '/lists')

    app.register_blueprint(api_bp, url_prefix='/api')

    return app
