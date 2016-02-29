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
from flask import Flask, render_template, g
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restless import APIManager

from flask_htmlmin import HTMLMIN


db = SQLAlchemy()
htmlmin = HTMLMIN()


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

    from memoboard.controllers import main, api

    app.register_blueprint(main)

    # Create the Flask-Restless API manager.
    manager = APIManager(app, flask_sqlalchemy_db=db)

    # Create API endpoints, which will be available at /api/<tablename> by
    # default. Allowed HTTP methods can be specified as well.
    manager.create_api(MemoList, methods=['GET', 'POST', 'PUT', 'DELETE'], include_methods=['uri'])
    manager.create_api(MemoItem, methods=['GET', 'POST', 'PUT', 'DELETE'], include_methods=['uri'])


    return app
