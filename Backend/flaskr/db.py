# following instructions from this tutorial https://flask.palletsprojects.com/en/3.0.x/tutorial/database/
import sqlite3
# ^ just found out this is standard and doesn't need install :<)
import json

import click
from flask import current_app, g

SCHEMA_SQL_FILE_PATH = 'schema.sql'
DEBUG_DB = True

USERNAME_LEN = 5  # <- for easy display on frontend. Also this is how we define it in the database schema.


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

    print("Created the tables if they don't already exist.")


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
        app.cli.add_command(drop_db_command)


# ----------------------------
# MY CUSTOM FUNCTIONS BEGIN HERE
# ----------------------------
def drop_db():
    # usage: during development, I may edit the schema and want to re-initialize the tables.
    # run the drop_db_command via the command line to do so.
    db = get_db()
    assert db is not None, "[DB: drop_db] Failed to connect to database."

    DROP_USERS_TABLE_SQL = """
        DROP TABLE IF EXISTS users;
        """
    DROP_LEADERBOARD_TABLE_SQL = """
        DROP TABLE IF EXISTS leaderboard;
        """
    db_cursor = db.cursor()
    try:
        db_cursor.execute(DROP_USERS_TABLE_SQL)
        db_cursor.execute(DROP_LEADERBOARD_TABLE_SQL)
    except Exception as e:
        print("Failed to drop_db :(")
        if DEBUG_DB:
            print("[DB: drop_db] Error: ", e)
        return False
    print("Dropped tables.")
    return True


@click.command('drop-db')
def drop_db_command():
    result = drop_db()
    click.echo(f'Successfully dropped tables? {result}')


@click.command('load-users')
def load_users_command():
    result = load_users()
    click.echo(f'Done running load_users via click command.')


def load_users():
    """
    Get all the rows from the `users` table.
    - No parameters since there is no condition or input.

    :return: [successBool, rowsOfUsers]
        1. successBool: if we were able to access the rows from the database
         - Usage: distinguish the event that no rows were returned 
            because the table is empty not because we weren't able to connect
        2. rowsOfUsers: list of dictionaries (rows)
         
    Example return for 
        [successBool, rowsOfUsers]
        [True, [{"user_id": 1, "username": "test1", "levelReached": 1}]]]
    """
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
        return (False, [])

    fetched_result = load_result.fetchall()
    close_db()
    jsonified_result = []
    for user_row in fetched_result:
        jsonified_result.append({
            "user_id": user_row["user_id"],
            "username": user_row["username"],
            "levelReached": user_row["levelReached"]
        })

    print(f"[DB: load_users_from_db] Successfully loaded users from database!")
    if DEBUG_DB:
        print(f"\tResult: {jsonified_result}")
    return (True, jsonified_result)


def get_usernames_only(load_result):
    # considering making a function to get the usernames from the load_result
    # this way I can check if a username is already in the table.
    # I do have a UNIQUE constraint on the username column, so this may or may not be necessary.
    # it just may be more user friendly if the warning comes from our server.
    pass


def add_user(username):
    """
    Create a row in the `users` table with the given username.
    :param: the username we want to store. 
    :return: 
        (on success) the ID of the new user
        (on failure) None
    """
    if DEBUG_DB:
        print(f"[DB: add_user] Top of Function.\n\tUsername = {username}")

    assert len(username) == USERNAME_LEN, \
        f"Username should be 5 characters long, " + \
        f"but is {len(username)} characters long."
    # todo: maybe validate the username isn't in the database already? i.e. look through the result from load.
    db = get_db()
    assert db is not None, "[DB: add_user] Failed to connect to database."

    ADD_USER_SQL = """
    INSERT INTO users(username) 
    VALUES (?);
    """

    db_cursor = db.cursor()
    try:
        load_result = db_cursor.execute(ADD_USER_SQL, (username, ))

        if load_result is None:
            print(f"Failed to add_user(username={username}) :(")
            close_db()
            return None
    except sqlite3.IntegrityError as e:
        # If it reaches here,
        # the only integrity constraint it should've been able
        # to violate is the UNIQUE constraint on the username column.
        print(f"[DB: add_user] Unable to add user '{username}.'" +
              "\n\tUsername already exists in database.")
        if DEBUG_DB:
            print("Got this exact integrity error: ", e)
        return None

    db.commit()
    print(f"Successfully saved username={username} to database.")
    close_db()
    # Reference: https://www.sqlitetutorial.net/sqlite-python/insert/
    return db_cursor.lastrowid
