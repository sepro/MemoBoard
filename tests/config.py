"""
Configuration for unit testing
"""
import os
import tempfile

basedir = os.path.abspath(os.path.dirname(__file__))

# Flask settings, make sure to set the SECRET_KEY and turn DEBUG and TESTING to False for production
DEBUG = False
TESTING = True

SECRET_KEY = 'change me !'

# Database settings, database location and path to migration scripts
_, DATABASE_PATH = tempfile.mkstemp()
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + DATABASE_PATH
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'migration')
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False

# Minify pages when debug is off
MINIFY_PAGE = not DEBUG

# Debug settings
DEBUG_TB_INTERCEPT_REDIRECTS = False

