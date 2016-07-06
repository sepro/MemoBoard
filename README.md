[![Build Status](https://travis-ci.org/sepro/MemoBoard.svg?branch=master)](https://travis-ci.org/sepro/MemoBoard) [![codecov.io](https://codecov.io/github/sepro/MemoBoard/coverage.svg?precision=1)](https://codecov.io/github/sepro/MemoBoard/)

# MemoBoard

Single page web app to keep track of various things, like shopping lists, to dos, ... The backend is written in python
using flask and flask-restful. The front end is coded around the react and redux js libraries. Ideal to run on a hobby webserver 
(e.g. raspberry pi).


![MemoBoard main view](./docs/screenshots/main.png "MemoBoard")

## Installation

Installation instruction for deployment on a linux system. 

Clone the repository

    git clone https://github.com/sepro/MemoBoard.git MemoBoard
    
Set up a virtual environment
    
    cd MemoBoard
    virtualenv --python=python3 venv
    
Activate the environment and install packages

    source venv/bin/activate
    pip install -r requirements.txt
    
Configure MemoBoard

    vim config.py

Create the database

    python db_action.py create
    
Run tests and run app

    python run_tests.py
    
    python run.py
    
Check the web how to configure the webserver of your choice (tested with uwsgi and nginx) to serve memoboard. In case
a sqlite database is used, make sure the file is readable and writeable by the webserver.