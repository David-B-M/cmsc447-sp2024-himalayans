import os

import flask
import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
import sqlite3
# hopefully Flask will automatically know to find get_db in db.py considering the Flask documentation recommendaed that structure.

RESPONSE_MESSAGE_KEY = "msg"


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
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

    # ---------------------------
    # put application's code here
    # ---------------------------
    @cross_origin()
    @app.route('/')
    def home():
        print("Successfully loaded `/` endpoint!")
        response = {
            RESPONSE_MESSAGE_KEY: "Welcome to Everest the Olympicat Backend!"
        }
        home_response = flask.Response(response=json.dumps(response), status=200)
        home_response.headers['Access-Control-Allow-Origin'] = '*'
        home_response.headers["content-type"] = "application/json"
        return home_response
    @cross_origin()
    @app.route("/load_users", methods=["GET"])
    def load_users():
        """
        Example usage: Frontend StartGame page 
            we display which games they can load from the data here.

        :return:
            (on success) JSON response with user rows. 
                {"ok": True,
                "users": 
                    [{..., "username": "ab123", ...}, {...}]
                }
            (on failure) msg - "Failed to load users"
                - Idea: not setting type to JSON 
                so that the frontend 
                recognizes its an error when trying to interpret the empty list.
            
        """
        load_response = {}
        RESULT_BOOL_INDEX = 0
        RESULT_USERS_JSON_INDEX = 1

        load_user_response = flask.Response()
        load_user_response.headers['Access-Control-Allow-Origin'] = '*'
        load_user_response.headers["content-type"] = "application/json"

        loaded_users = db.load_users()
        if not loaded_users[RESULT_BOOL_INDEX]:
            load_response["users"] = []
            add_response_failure_options(load_response,
                                         "Failed to load users.")
            load_user_response.response = json.dumps(load_response)
            return

        # =========
        # Success!
        # =========
        users = loaded_users[RESULT_USERS_JSON_INDEX]
        load_response["users"] = users
        load_user_response.response = json.dumps(load_response)
        print("Loaded users: ", users)
        return load_response
    @cross_origin()
    @app.route("/add_user", methods=["POST"])
    def add_user():
        """
        Create a row in our `users` table for the given username.
        :param: the username we want to store.
        :return: 
            (on success)  ex. {... , user_id: 123, ...}
                Notably - the user_id for that user. 
                Save it so you can look them up fast later.
            (on fail)     ex. {..., user_id: None, ...}

            Todo: maybe just return the entire row? 
                So we don't have to look it up later.
        """
        # constants
        DB_UNABLE_ADD_USER = None

        # handling the request
        response = {
            "user_id": DB_UNABLE_ADD_USER
        }  # <- None by default (db fails to add).
        print("%" * 50)
        print(f"DEBUGGING /add_user\n\tRequest=\n\t{request.get_data()}")
        print("%" * 50)
        # get the username they passed to the request.
        username = None

        add_user_response = flask.Response()
        add_user_response.headers['Access-Control-Allow-Origin'] = '*'
        add_user_response.headers["content-type"] = "application/json"

        if request.headers["Content-Type"] == "application/x-www-form-urlencoded":
            # form data is a multi-dict
            # reference: https://flask-api.github.io/flask-api/api-guide/parsers/
            # https://tedboy.github.io/flask/generated/generated/werkzeug.MultiDict.html
            username = request.form.get("username")
        else:
            username = request.args.get('username')

        if username == None:
            add_response_failure_options(response, 
            "[Endpoint: add_user] Unable to parse username from request. (Got null)")
            add_user_response.response=json.dumps(response)
            add_user_response.status=404
            return add_user_response
        # use the database method to try to add the user (validates as well)
        db_add_user_result = db.add_user(username)

        if db_add_user_result == DB_UNABLE_ADD_USER:
            add_response_failure_options(response)
            response[RESPONSE_MESSAGE_KEY] = \
                f"[Endpoint: add_user] Failed to add user {username} to database. :("
            add_user_response.response = json.dumps(response)
            add_user_response.status = 404
            return add_user_response

        response["user_id"] = db_add_user_result
        response["msg"] = f"Successfully added user {username} to database! :D"
        add_user_response.response = json.dumps(response)
        add_user_response.status = 200
        return add_user_response

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'



    def add_response_failure_options(response,
                                     message="Content-Type not supported!"):
        response[RESPONSE_MESSAGE_KEY] = message
        response['ok'] = False

    return app
