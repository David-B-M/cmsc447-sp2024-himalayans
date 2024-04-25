# following instructions from this tutorial https://flask.palletsprojects.com/en/3.0.x/tutorial/database/
import sqlite3
# ^ just found out this is standard and doesn't need install :<)
import json

import click
from flask import current_app, g

SCHEMA_SQL_FILE_PATH = 'schema.sql'
DEBUG_DB = True

USERNAME_LEN = 20  # <- for easy display on frontend. Also this is how we define it in the database schema.

# custom based on how I return data in this file.
# load_users() => [successBool, rowsOfUsers]
NUM_RETURNS_LOAD_USERS = 2
RETURN_BOOL_INDEX = 0
RETURN_DATA_INDEX = 1

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


def get_user_id(username, db=None):
    """
    :return: [successBool, user_id]
        successBool describes if we were able to access and query the db.
        user_id is None if there is no entry in the table.
    """
    if not db:
        db = get_db()
        assert db is not None, "[DB: get_user_id] Failed to connect to database."
    db_cursor = db.cursor()

    GET_ID_SQL = """
    SELECT user_id from users
    where username = ?
    """
    user_id = None
    try:
        # assumes there is only 1 result from querying by username
        # then we can use the column name to get the value itself 
        user_id_result = db_cursor.execute(GET_ID_SQL, (username, )).fetchall()
        
        # ^ returns the username in a list. [user_id], can be empty if there's no entry, so leave it as None
        if user_id_result:
            user_id = user_id_result[0]["user_id"]
    except Exception as e:
        print(f"Unable to get_user_id(username={username})")
        return [False, None]

    db.commit()
    print(f"Successfully retrieved `user_id`={user_id} for username={username}.")
    # Reference: https://www.sqlitetutorial.net/sqlite-python/insert/
    return [True, user_id]
    # checks if they have an entry in the `usernames` table.
    
def get_saved_user(username, db=None, do_close_db=False, silence=True):
    """
    Get the info from the `users` table for this one user.
    Usage: tell the frontend/user what's going on in case a user isn't found (in this func)
    :return: [True/False, {user_id: ..., username: ..., levelReached: ...}]
        => [True, {}] means we were able to load the result, but {} means they weren't found
    """
    GET_ONE_USER_SQL = """
    SELECT * from users
    WHERE username = ?
    """
    # If we get an empty result => user doesn't exist.
    if db == None:
        db = get_db()
        assert db is not None, "[DB: get_saved_user] Failed to connect to database."
        
    db_cursor = db.cursor()
    get_user_result = db_cursor.execute(GET_ONE_USER_SQL, (username,))

    if get_user_result is None:
        if not silence:
            print("[DB: get_saved_user] Failed to get_saved_user :(")
        close_db()
        return (False, {})

    fetched_result = get_user_result.fetchall()
    if do_close_db:
        close_db()
    
    if len(fetched_result) > 1:
        if not silence:
            print(f"[DB: get_saved_user] Found too many users with username `{username}`." +
                f"\n\tExpected 1. Got {len(fetched_result)}")
        return [True, fetched_result]
    elif len(fetched_result) == 0:
        if not silence:
            print(f"[DB: get_saved_user] Found NO users with username `{username}`.")
        return [True, {}]

    jsonified_result = {
        "user_id": fetched_result[0]["user_id"],
        "username": fetched_result[0]["username"],
        "levelReached": fetched_result[0]["levelReached"]
    }

    if not silence:
        print(f"[DB: get_saved_user] Successfully loaded users from database!")
    if DEBUG_DB:
        print(f"\tResult: {jsonified_result}")
    return (True, jsonified_result)

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
    assert db is not None, "[DB: load_users] Failed to connect to database."

    LOAD_USERS_SQL = """
    SELECT * from users;
    """
    db_cursor = db.cursor()
    load_result = db_cursor.execute(LOAD_USERS_SQL)

    if load_result is None:
        print("[DB: load_users] Failed to load_users :(")
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

    print(f"[DB: load_users] Successfully loaded users from database!")
    if DEBUG_DB:
        print(f"\tResult: {jsonified_result}")
    return (True, jsonified_result)


def get_usernames_only(load_result):
    """
    Parse the result of the load_users function (select all query => jsonified)
    :param load_result: Expecting format `[successBool, rowsOfUsers]`
    - recall the bool tells us if we didn't have trouble loading data from the db.
      False => we had trouble!
      True  => we didn't have trouble. If the list is empty thats because the db is empty.
    :return: [successBool, rowOfUsernames]
    """
    
    if load_result[RETURN_BOOL_INDEX] == False:
        print("[db: get_usernames_only] load_users returned False, won't bother finding usernames.")
        return (False, [])

    elif len(load_result) < NUM_RETURNS_LOAD_USERS or (
        load_result[RETURN_DATA_INDEX] is None or 
        load_result[RETURN_DATA_INDEX] == []):

        print("[db: get_usernames_only] Cannot get usernames from empty load_result[1].")
        return (False, [])

    # considering making a function to get the usernames from the load_result
    # this way I can check if a username is already in the table.
    # I do have a UNIQUE constraint on the username column, so this may or may not be necessary.
    # it just may be more user friendly if the warning comes from our server.
    loaded_data = load_result[RETURN_DATA_INDEX]
    usernames = []
    for row in loaded_data:
        usernames.append(row.get("username"))
    return usernames


def add_user(username):
    """
    Create a row in the `users` table with the given username.
    :param: the username we want to store. 
    :return: 
        (on success) the ID of the new user
        (on failure) None
    """
    UNABLE_ADD_USER_RETURN = None

    # todo: maybe validate the username isn't in the database already? i.e. look through the result from load.
    db = get_db()
    assert db is not None, "[DB: add_user] Failed to connect to database."

    if username is None:
        print("db.py: Cannot add a null username!")
        return UNABLE_ADD_USER_RETURN

    if not (len(username) <= USERNAME_LEN):
        # instead of giving an assertion error
        print(f"Username should be under or equal {USERNAME_LEN} to characters long, " + \
        f"but is {len(username)} characters long.")
        return UNABLE_ADD_USER_RETURN
        

    ADD_USER_SQL = """
    INSERT INTO users(username) 
    VALUES (?);
    """

    db_cursor = db.cursor()
    user_id = None # <- return this
    try:
        load_result = db_cursor.execute(ADD_USER_SQL, (username, ))

        if load_result is None:
            print(f"Failed to add_user(username={username}):\n\t Couldn't retrieve the result from the query to add the user")
            close_db()
            return UNABLE_ADD_USER_RETURN
        
        user_id = db_cursor.lastrowid
        
        print(f"Successfully saved username={username} to database.")
        
    except sqlite3.IntegrityError as e:
        # If it reaches here,
        # the only integrity constraint it should've been able
        # to violate is the UNIQUE constraint on the username column.
        print(f"[DB: add_user] Unable to add user '{username}.'" +
              "\n\tUsername already exists in database.")
        if DEBUG_DB:
            print("Got this exact integrity error: ", e)
        return None

    try:
        # also add them to the leaderboard :p
        initialize_score(username=username, score=0, db=db, user_id=user_id)
        print("[db: add_user] Successfully initialized a row in the leaderboard for {username} with score 0.")
    except Exception as e:
        print(f"Unable to initialize score row for username = {username}")
        if DEBUG_DB:
            print(f"\tException: {e}")

    db.commit()
    close_db()
    return user_id



def read_user_level(username):
    """
    :return: (fail case) None
             (success case) integer from the table `users[levelReached]`
    """
    db = get_db()
    assert db is not None, "[DB: read_user_level] Failed to connect to database."

    QUERY_LEVEL_SQL = """
    SELECT levelReached from users 
    where username = ?;
    """
    db_cursor = db.cursor()
    level_result = None
    try:
        # assumes there is only 1 result from querying by username
        # then we can use the column name to get the value itself 
        level_result = db_cursor.execute(QUERY_LEVEL_SQL, (username, )).fetchall()[0]["levelReached"]
    except Exception as e:
        print(f"Unable to read_user_level(username={username})")
        close_db()
        return None
    db.commit()
    print(f"Successfully retrieved `levelReached`={level_result} for username={username}.")
    close_db()
    # Reference: https://www.sqlitetutorial.net/sqlite-python/insert/
    return level_result


def increment_user_level(username):
    """
    Usage: if they win a level, call the endpoint that will call this ("/POST update_level)!

    Increment their current level by 1, but only if they haven't already beat all 3 levels.
    Use "GET /user_level" endpoint 

    :return: True/False based on if the update was successful.
    ============================================================================
                                    Note!
    ---------------------------------------------------------------------------
        It still returns True if they were at level 3 and the value didn't change :p
    ============================================================================
    It's only False if it failed to connect to the database or we got an error.
    """
    db = get_db()
    assert db is not None, "[DB: increment_user_level] Failed to connect to database."

    INCREMENT_USER_LEVEL_SQL = """
    UPDATE users 
    SET levelReached = levelReached + 1
    WHERE username = ? AND levelReached < 3;
    """

    existing_user_result = get_saved_user(username, db, do_close_db=False, silence=True)
    if not existing_user_result[RETURN_BOOL_INDEX]:
        print(f"[DB: increment_user_level ] Unable to verify existence of user {username}. Check logs.")
        return False
    elif not existing_user_result[RETURN_DATA_INDEX]:
        print(f"[DB: increment_user_level] Will not increment level for nonexistent user: {username}")
        return False

    db_cursor = db.cursor()
    num_affected_rows = None
    try:
        update_result = db_cursor.execute(INCREMENT_USER_LEVEL_SQL, (username, ))
        # according to documentation, you have to fetchall in order for the rowcount to update
        # Reference: https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.rowcount
        db_cursor.fetchall()
        num_affected_rows = db_cursor.rowcount
    except Exception as e:
        print(f"[DB: increment_user_level] Oh no! Something went wrong! Unable to increment_user_level(username={username})")
        if DEBUG_DB:
            print(f"\n\tExeption:\n\t{e}")
        close_db()
        return False

    if num_affected_rows is None:
        print("[DB: increment_user_level] Unable to verify if update completed. Giving up.")
        return False
    elif num_affected_rows == -1:
        print("[DB: increment_user_level] Update failed, maybe check the query syntax.")
        return False
    # ~~~~~~~~~
    # Success!
    # ~~~~~~~~~
    db.commit()
    print(f"Successfully incremented levelReached for {username}!")
    close_db()
    return True


def load_leaderboard(exclude_columns=["user_id"]):
    """
    Get all the rows from the `leaderboard` table.
    - Basically the same logic as load_users except it accesses the leaderboard table.
    - ignore the user_id by default, if you want to keep it, pass in exclude_columns=[]
    :return: [successBool, rowsFromLeaderboard]
        1. successBool: if we were able to access the rows from the database
         - Usage: distinguish the event that no rows were returned 
            because the table is empty not because we weren't able to connect
        2. rowsFromLeaderboard: list of dictionaries (rows)
        - attributes (keys): rank , user_id, username, score
         
    Example return for 
        [successBool, rowsFromLeaderboard]
        [True, [{"rank": 1, "username": "test1", "score": 100}]]]
    """
    db = get_db()
    assert db is not None, "[DB: load_leaderboard] Failed to connect to database."

    LOAD_LEADERBOARD_SQL = """
    SELECT * from leaderboard;
    """
    db_cursor = db.cursor()
    load_result = db_cursor.execute(LOAD_LEADERBOARD_SQL)

    if load_result is None:
        print("Failed to load_leaderboard :(")
        close_db()
        return (False, [])

    fetched_result = load_result.fetchall()
    close_db()
    jsonified_result = []
    for user_row in fetched_result:
        json_row = {}
        # Expecting: rank , user_id, username, score
        for column in ["rank", "user_id", "username", "score"]:
            if column not in exclude_columns:
                json_row[column] = user_row[column]
        jsonified_result.append(json_row)

    print(f"[DB: load_leaderboard] Successfully loaded rows from `leaderboard` table in database!")
    if DEBUG_DB:
        print(f"\tResult: {jsonified_result}")
    return (True, jsonified_result)


def get_leaderboard_row(username, db=None, do_close=False, exclude_columns=["user_id"]):
    if not db:
        db = get_db()
        assert db is not None, "[DB: load_leaderboard] Failed to connect to database."
    
    GET_ROW_SQL = """
    SELECT * from leaderboard
    where username = ?;
    """
    db_cursor = db.cursor()
    load_result = db_cursor.execute(GET_ROW_SQL, (username,))

    if load_result is None:
        print("Failed to get_leaderboard_row :(")
        close_db()
        return (False, [])

    fetched_result = load_result.fetchall()

    if do_close:
        close_db()
    jsonified_result = []
    for user_row in fetched_result:
        json_row = {}
        # Expecting: rank , user_id, username, score
        for key in user_row:
            if key not in exclude_columns:
                json_row[key] = user_row[key]
        jsonified_result.append(json_row)

    print(f"[DB: get_leaderboard_row] Successfully loaded username row from `leaderboard` table in database!")
    if DEBUG_DB:
        print(f"\tResult: {jsonified_result}")
    return (True, jsonified_result)


def initialize_score(username, score, db=None, user_id=None, do_close=False):
    """
    :param do_close: Signal if I should close the database. i.e. if this is called from a solo endpoint.
    :return: rank!
    """
    if not db:
        db = get_db()
        assert db is not None, "[DB: initialize_score] Failed to connect to database."
        
    # not specifying rank because it should auto set and increment
    INITIALIZE_SCORE_SQL = \
    """
    INSERT INTO leaderboard(user_id, username, score) 
    VALUES (?, ?, ?);
    """
    rank = None

    if user_id is None:
        # try to get the ID (maybe for the 2nd time) from the database
        user_id_result = get_user_id(username)
        user_id = user_id_result[RETURN_DATA_INDEX]
        if not user_id_result[RETURN_BOOL_INDEX]:
            print("Create the user in the `users` table 1st! Won't initialize score")
            return None
        if user_id is None:
            print("[db: initialize_score] Will not initialize a score for a player that doesn't exist!")
            return None
    
    db_cursor = db.cursor()
    try:
        load_result = db_cursor.execute(INITIALIZE_SCORE_SQL, (user_id, username, score))

        if load_result is None:
            print(f"Failed to initialize_score(username={username}, score={score}):\n\t Couldn't retrieve the result from the query to add the user")
            close_db()
            return None
    except sqlite3.IntegrityError as e:
        print(f"[DB: initialize_score] Unable to add user '{username}.'" +
              "\nuser_id already exists in `leaderboard` table database.")
        if DEBUG_DB:
            print("Got this exact integrity error: ", e)
        return None

    db.commit()
    print(f"Successfully initialied leaderboard row for username={username} with score={score}.")
    if do_close:
        close_db()
    # Reference: https://www.sqlitetutorial.net/sqlite-python/insert/
    return db_cursor.lastrowid

def increment_score(username, score):
    """
    Checks if there is an entry for them in the scores table.
    """
    db = get_db()
    assert db is not None, "[DB: load_leaderboard] Failed to connect to database."

    UPDATE_SCORE_SQL = """
    UPDATE leaderboard 
    SET score = score + ?
    WHERE username = ?;
    """
    
    existing_user_result = get_saved_user(username, db, do_close_db=False, silence=True)
    if not existing_user_result[RETURN_BOOL_INDEX]:
        print(f"[DB: increment_score] Unable to verify existence of user {username}. Check logs.")
        return False
    elif not existing_user_result[RETURN_DATA_INDEX]:
        print(f"[DB: increment_score] Will NOT increment score of non-existent user: {username}")
        return False

    db_cursor = db.cursor()
    num_affected_rows = None
    try:
        update_result = db_cursor.execute(UPDATE_SCORE_SQL, (score, username))
        # according to documentation, you have to fetchall in order for the rowcount to update
        # Reference: https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.rowcount
        db_cursor.fetchall()
        num_affected_rows = db_cursor.rowcount
    except Exception as e:
        print(f"[DB: increment_score] Oh no! Something went wrong! Unable to increment_score(username={username})")
        if DEBUG_DB:
            print(f"\n\tExeption:\n\t{e}")
        close_db()
        return False

    if num_affected_rows is None:
        print("[DB: increment_score] Unable to verify if update completed. Giving up.")
        return False
    elif num_affected_rows == -1:
        print("[DB: increment_score] Update failed, maybe check the query syntax.")
        return False
    # ~~~~~~~~~
    # Success!
    # ~~~~~~~~~
    db.commit()
    print(f"Successfully incremented score by `{score} pts` for {username}!")
    close_db()
    return True