# following instructions from this tutorial https://flask.palletsprojects.com/en/3.0.x/tutorial/database/
import sqlite3
# ^ just found out this is standard and doesn't need install :<)

import click
from flask import current_app, g

SCHEMA_SQL_FILE_PATH = 'schema.sql'


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(current_app.config['DATABASE'],
                               detect_types=sqlite3.PARSE_DECLTYPES)
        g.db.row_factory = sqlite3.Row

    print("Getting database connection")

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

    print("Closed database connection.")


def init_db():
    db = get_db()

    with current_app.open_resource(SCHEMA_SQL_FILE_PATH) as f:
        db.executescript(f.read().decode('utf8'))

    print("Initialized database!")
