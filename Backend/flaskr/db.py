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


#
"""
Hppefully, this will initialize the database when the app starts up
Using @app.cli.command makes it so we can run it from the commmand "flask"
- `flask initdb`
"""


# source: https://flask.palletsprojects.com/en/3.0.x/tutorial/database/
@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


# source: https://flask.palletsprojects.com/en/3.0.x/tutorial/database/
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
