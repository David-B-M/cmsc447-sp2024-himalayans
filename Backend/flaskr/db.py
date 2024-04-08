# following instructions from this tutorial https://flask.palletsprojects.com/en/3.0.x/tutorial/database/
import sqlite3
# ^ just found out this is standard and doesn't need install :<)

import click
from flask import current_app, g

SCHEMA_SQL_FILE_PATH = 'schema.sql'
DEBUG_DB = True


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
    """Creates the tables if they don't already exist"""
    db = get_db()

    with current_app.open_resource(SCHEMA_SQL_FILE_PATH) as f:
        db.executescript(f.read().decode('utf8'))


# Reference: https://flask.palletsprojects.com/en/3.0.x/tutorial/database/
@click.command('init-db')
def init_db_command():
    """Allows you to initialize the database from the command line `flask init-db`"""
    init_db()
    click.echo('Initialized the database.')


# source: https://flask.palletsprojects.com/en/3.0.x/tutorial/database/
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    if DEBUG_DB:
        app.cli.add_command(load_users_command)


# ----------------------------
# MY CUSTOM FUNCTIONS BEGIN HERE
# ----------------------------


@click.command('load-users')
def load_users_command():
    result = load_users_from_db()
    click.echo(f'Loaded users from db: {result}')


def load_users_from_db():
    db = get_db()
    assert db is not None, "[DB: load_users_from_db] Failed to connect to database."

    LOAD_USERS_SQL = """
    SELECT * from users;
    """
    db_cursor = db.cursor()
    load_result = db_cursor.execute(LOAD_USERS_SQL)

    if load_result is None:
        print("Failed to load_users_from_db :(")
        close_db()
        return None

    fetched_result = load_result.fetchall()
    close_db()
    return fetched_result
