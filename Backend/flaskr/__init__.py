import os

from flask import Flask, request
# hopefully Flask will automatically know to find get_db in db.py considering the Flask documentation recommendaed that structure.

RESPONSE_MESSAGE_KEY = "msg"


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

    # ---------------------------
    # put application's code here
    # ---------------------------
    @app.route('/')
    def home():
        print("Successfully loaded `/` endpoint!")
        home_response = {
            RESPONSE_MESSAGE_KEY: "Welcome to Everest the Olympicat Backend!"
        }
        add_response_success_options(home_response)
        return home_response

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

        loaded_users = db.load_users()
        if not loaded_users[RESULT_BOOL_INDEX]:
            load_response["users"] = []
            add_response_failure_options(load_response,
                                         "Failed to load users.")
            return load_response

        # =========
        # Success!
        # =========
        users = loaded_users[RESULT_USERS_JSON_INDEX]
        load_response["users"] = users
        add_response_success_options(load_response)
        print("Loaded users: ", users)
        return load_response

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
        print(f"!!DEBUGGING /add_user!! Request=\n\t{request.get_data()}")
        # get the username they passed to the request.
        username = None
        if request.headers[
                "Content-Type"] == "application/x-www-form-urlencoded":
            # form data is a multi-dict
            # reference: https://flask-api.github.io/flask-api/api-guide/parsers/
            # https://tedboy.github.io/flask/generated/generated/werkzeug.MultiDict.html
            username = request.form.get("username")
        else:
            username = request.args.get('username')

        # use the database method to try to add the user (validates as well)
        db_add_user_result = db.add_user(username)

        if db_add_user_result == DB_UNABLE_ADD_USER:
            add_response_failure_options(response)
            response[RESPONSE_MESSAGE_KEY] = \
                f"Failed to add user {username} to database. :("
            return response

        response["user_id"] = db_add_user_result
        add_response_success_options(response)
        return {
            "ok": True,
            "msg": f"Successfully added user {username} to database! :D"
        }

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    def add_response_success_options(response):
        # setting the response headers to be json so we can use things like response.status_code later on hopefully
        response["headers"] = {"content-type": "application/json"}
        response["ok"] = True

    def add_response_failure_options(response,
                                     msg="Content-Type not supported!"):
        response['msg'] = msg
        response['ok'] = False

    return app