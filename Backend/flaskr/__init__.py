import os

from flask import Flask


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

        
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


    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app
