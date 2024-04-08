import os

from flask import Flask, request
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
        loaded_users = db.load_users_from_db()
        if not loaded_users:
            return {"ok": False, "users": None}
        print("Loaded users: ", loaded_users)
        return {"ok": True, "users": loaded_users}

    @app.route("/addUser", methods=["POST"])
    def add_user():
        username = None
        if request.headers["Content-Type"] == "application/json":
            username = request.get_json()["username"]
        else:
            username = request.params.require('username')
        successfully_added = db.add_user(username)
        # do something
        if not successfully_added:
            return {
                "ok": False,
                "msg": f"Unable to add user {username} to database. :("
            }

        return {
            "ok": True,
            "msg": f"Successfully added user {username} to database! :D"
        }

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app
