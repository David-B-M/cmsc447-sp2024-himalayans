import os

from flask import Flask
# hopefully Flask will automatically know to find get_db in db.py considering the Flask documentation recommendaed that structure.

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

    # source:
    # https://flask.palletsprojects.com/en/3.0.x/tutorial/database/ 
    from . import db
    db.init_app(app)
    
    @app.route('/')
    def home():  # put application's code here
        print("Successfully loaded `/` endpoint!")
        return {"ok": True}

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

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app
