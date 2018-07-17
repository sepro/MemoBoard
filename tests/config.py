"""
Configuration for unit testing
"""
import os
import tempfile

basedir = os.getcwd()

# Flask settings, make sure to set the SECRET_KEY and turn DEBUG and TESTING to False for production
DEBUG = False
TESTING = True

SECRET_KEY = 'change me !'

# Database settings, database location and path to migration scripts
# use in memory sqlitedb for testing
SQLALCHEMY_DATABASE_URI = 'sqlite:///'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'migrations')
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False

# Minify pages when debug is off
MINIFY_PAGE = not DEBUG

# Debug settings
DEBUG_TB_INTERCEPT_REDIRECTS = False

