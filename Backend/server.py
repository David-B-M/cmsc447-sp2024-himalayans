from flask import Flask
app = Flask(__name__)

import sqlite3

@app.route('/test')
def hello_world():  # put application's code here
    return {"sample": ["hello world", "random data", "booo"]}

def load_users():
    # when the user is on the StartGame page and we display which games they can load from
    # we can call this function!
    SQL_FOR_LOAD_ALL_USERS = \
    """
    SELECT * from users
    """
    # todo: add the execution for this command and return it nicely i.e. json
    pass

def create_users_table():
    """
    """
    columns = ["name", "levelReached", ]
    SQL_FOR_CREATE_USERS = \
    """
    CREATE TABLE users (
        PRIMARY KEY name varchar(5) NOT NULL UNIQUE,
        levelReached integer NOT NULL,
    );
    """
    # don't let them save a name if its already in the table
    # the levelReached should always be initialized to 1

    # todo: decide where to store their high scores, and if we want to show them this info when they load.
    
    pass

if __name__ == '__main__':
    app.run(debug=True)
