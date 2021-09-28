#!/usr/bin/env python3
from memoboard import create_app, db
import os
import coloredlogs

coloredlogs.install()

app = create_app("config")


@app.cli.command()
def createdb():
    """
    function to create the initial database and migration information
    """
    SQLALCHEMY_DATABASE_URI = app.config["SQLALCHEMY_DATABASE_URI"]

    if SQLALCHEMY_DATABASE_URI.startswith("sqlite:///"):
        path = os.path.dirname(
            os.path.realpath(SQLALCHEMY_DATABASE_URI.replace("sqlite:///", ""))
        )
        if not os.path.exists(path):
            os.makedirs(path)

    db.create_all(app=app)


if __name__ == "__main__":
    app.run()
