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
    @app.route('/json', methods=["POST"])
    def test_json():
        data = request.get_json()
        print("data is " + format(data))
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
        result = {}

        RESULT_BOOL_INDEX = 0
        RESULT_USERS_JSON_INDEX = 1

        load_user_response = init_response()

        loaded_users = db.load_users()
        if not loaded_users[RESULT_BOOL_INDEX]:
            result["users"] = []
            result[RESPONSE_MESSAGE_KEY] = "Failed to load users."
            load_user_response.status = 404

            load_user_response.response = json.dumps(result)

            return load_user_response

        # =========
        # Success!
        # =========
        users = loaded_users[RESULT_USERS_JSON_INDEX]
        result["users"] = users
        load_user_response.response = json.dumps(result)
        print("Loaded users: ", users)
        return load_user_response

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
        result = {
            "user_id": DB_UNABLE_ADD_USER
        }  # <- None by default (db fails to add).
        # get the username they passed to the request.
        username = None

        add_user_response = init_response()
        username = get_param_from_request(param="username", response=add_user_response)

        if username == None:  # ^ function auto sets the status to 404 and the message if it fails.
            return add_user_response
        # use the datadd_user_responseabase method to try to add the user (validates as well)
        db_add_user_result = db.add_user(username)
        result["user_id"] = db_add_user_result
        if db_add_user_result == DB_UNABLE_ADD_USER:
            result[RESPONSE_MESSAGE_KEY] = \
                f"[Endpoint: add_user] Failed to add user `{username}` to database. :("
            add_user_response.response = json.dumps(result)
            add_user_response.status = 404
            return add_user_response

        result[RESPONSE_MESSAGE_KEY] = f"Successfully added user `{username}` to database! :D"
        result["user_id"] = db_add_user_result

        add_user_response.response = json.dumps(result)
        add_user_response.status = 200
        return add_user_response

    @cross_origin()
    @app.route("/increment_user_level", methods=["POST"])
    def increment_user_level():
        """
        Call this in the use case "LevelWon", but not in the use case "LevelFailed"
        Expects a username.
        Use this to increase their levelReached!
        :return:
            {"success": updatedLevelSuccess}
        """
        # handling the request
        result = {
            "success": False
        }  # <- None by default (db fails to add).
        
        increment_level_response = init_response()
        # get the username they passed to the request.
        username = None
        username = get_param_from_request(param="username", response=increment_level_response)
        if username == None:  
            print("Will not increment user level for nonexistent user.")
            return increment_level_response

        db_increment_level_success = db.increment_user_level(username)
        result["success"] = db_increment_level_success
        if not db_increment_level_success:
            result[RESPONSE_MESSAGE_KEY] = \
                f"[Endpoint: add_user] Failed to increment user level for `{username}` :("
            increment_level_response.response = json.dumps(result)
            increment_level_response.status = 404
            return increment_level_response

        result[RESPONSE_MESSAGE_KEY] = f"Successfully increment level for user = `{username}` :D"
        increment_level_response.response = json.dumps(result)
        increment_level_response.status = 200
        return increment_level_response

    @cross_origin() 
    @app.route("/read_user_level", methods=["GET"])
    def read_user_level():
        """
        Expects a username to be passed to be used for looking up a particular user.
        :param username: (from request)
        :return: 
            The level number that that user has reached!
            {"level": 1 or 2 or 3}
        """
        result = {"level": None}
        user_level_response = init_response()

        username = get_param_from_request(response=user_level_response)
        if username == None: # the user can check the output for reason for failure :p
            print("[GET /read_user_level] Unable to get username from request.")
            return user_level_response

        db_level_result = db.get_user_level(username)
        print(f"[__init__/read_user_level] DEBUG: Got level={db_level_result} ")
        if db_level_result == None:
            result["level"] = None
            result[RESPONSE_MESSAGE_KEY] = "Failed to read user level."
            user_level_response.status = 404
            user_level_response.response = json.dumps(result)
            return user_level_response

        # =========
        # Success!
        # =========
        result["level"] = db_level_result
        user_level_response.response = json.dumps(result)
        print(f"Done reading level for username=`{username}`: ", db_level_result)
        return user_level_response

    @cross_origin() 
    @app.route("/load_leaderboard", methods=["GET"])
    def load_leaderboard():
        """
        Example usage: Frontend ViewLeaderboard page 
            display ranks, usernames, and their scores!

        :return:
            (on success) JSON response with user rows. 
                {"ok": True,
                "rows": 
                    [{..., "username": "ab123", ...}, {...}]
                }
            (on failure) msg - "Failed to load users"
                - Idea: not setting type to JSON 
                so that the frontend 
                recognizes its an error when trying to interpret the empty list.
            
        """
        result = {}

        RESULT_BOOL_INDEX = 0
        RESULT_USERS_JSON_INDEX = 1

        load_leaderboard_response = init_response()

        loaded_leaderboard = db.load_leaderboard()
        if not loaded_leaderboard[RESULT_BOOL_INDEX]:
            result["rows"] = []
            result[RESPONSE_MESSAGE_KEY] = "Failed to load leaderboard."
            load_leaderboard_response.status = 404

            load_leaderboard_response.response = json.dumps(result)

            return load_leaderboard_response

        # =========
        # Success!
        # =========
        rows = loaded_leaderboard[RESULT_USERS_JSON_INDEX]
        result["rows"] = rows
        load_leaderboard_response.response = json.dumps(result)
        print("Loaded leaderboard rows: ", rows)
        return load_leaderboard_response

    @cross_origin() 
    @app.route("/increment_score", methods=["POST"])
    def increment_score():
        """
        Uses db.increment_score(username, score)
        :params: (throught the request)
        - username
        - score (to increment the score they already have with.)
        """
        # handling the request
        result = {
            "success": False
        }  # <- None by default (db fails to add).
        
        increment_score_response = init_response()
        # get the username they passed to the request.
        username = None
        username = get_param_from_request(param="username", response=increment_score_response)
        if username == None:  
            print("Will not increment user score for nonexistent user.")
            return increment_score_response
        score = get_param_from_request(param="score", response=increment_score_response)
        if score == None:  
            print("Cannot increment user score without a score!!")
            return increment_score_response
        levelScore = get_param_from_request(param="levelScore", response=increment_score_response)

        db_increment_level_success = db.increment_score(username, levelScore, score)
        result["success"] = db_increment_level_success
        if not db_increment_level_success:
            result[RESPONSE_MESSAGE_KEY] = \
                f"[Endpoint: increment_score] Failed to increment user score for `{username}` :("
            increment_score_response.response = json.dumps(result)
            increment_score_response.status = 404
            return increment_score_response

        result[RESPONSE_MESSAGE_KEY] = f"Successfully increment score by {score} for user = `{username}` :D"
        increment_score_response.response = json.dumps(result)
        increment_score_response.status = 200
        return increment_score_response

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'



    def init_response(content_type="application/json"):
        response = flask.Response(mimetype=content_type)
        response.headers['Access-Control-Allow-Origin'] = '*'
        # response.headers["content-type"] = content_type
        return response


    def get_param_from_request(response, param="username", failure_msg="Unable to get username from request."):
        """
        :return: 
            (on fail) - None
            (on success) - the value from the request!
        """
        value = None
        # if request.headers["Content-Type"] == "application/x-www-form-urlencoded":
        if request.content_type == "application/x-www-form-urlencoded":
            # form data is a multi-dict
            # reference: https://flask-api.github.io/flask-api/api-guide/parsers/
            # https://tedboy.github.io/flask/generated/generated/werkzeug.MultiDict.html
            
            #DEBUG
            print("DEBUGGING (get_param_from_request): Attempting getting username from FORM: ")
            value = request.form.get(param)
            print(f"\t{param}")
        else:
            print("DEBUGGING (get_param_from_request): Attempting getting username from ARGS: ")
            value = request.args.get(param)
            print(f"\t{param}")

        # set the response flags to signify we were unable to get the username
        if value == None:
            # DEBUG
            print("Got None param.")
            response.status=404
            response.response = json.dumps({RESPONSE_MESSAGE_KEY: failure_msg})
            return None
        
        return value
        
    return app