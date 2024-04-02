from flask import Flask, g
app = Flask(__name__)

# todo: replace this.
# source: https://flask.palletsprojects.com/en/3.0.x/patterns/sqlite3/
DATABASE = '/path/to/database.db'

FINAL_LEVEL_NUMBER = 3

@app.route('/')
def home():  # put application's code here
    create_users_table()
    print("Successfully loaded `/` endpoint!")
    return {"ok": True}

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.route("/loadUsers", methods=["GET"])
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
    Initialize users table.
    """
    columns = ["name", "levelReached", ]
    SQL_FOR_CREATE_USERS = \
    f"""
    CREATE TABLE IF NOT EXISTS users (
        id integer NOT NULL UNIQUE,
        name varchar(5) NOT NULL UNIQUE,
        levelReached integer NOT NULL DEFAULT 1 CHECK (levelReached >= 1 AND levelReached <= {FINAL_LEVEL_NUMBER}),
    );
    """
    # don't let them save a name if its already in the table
    # the levelReached should always be initialized to 1

    # todo: decide where to store their high scores, and if we want to show them this info when they load.
    
    pass

if __name__ == '__main__':
    app.run(debug=True)
