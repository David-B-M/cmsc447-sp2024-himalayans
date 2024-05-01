"""
File: conftest.py
Date: 4/6/2024
Author: Flask Documentation + Jess
Description:
This code should allow me to test our endpoints using the pytest app client!

Particularly, I can use any "fixtures" here as variables in any of the tests in this directory. i.e. `app` (all without having to import them!)

Skeleton code gathered from this source:
https://flask.palletsprojects.com/en/3.0.x/testing/
"""

import pytest
from flaskr import create_app

# for my test_usernames
VALID_USERNAME_KEY = "valid_username"
INVALID_USERNAME_KEY = "invalid_username"
# endpoint names are set at the top of each individual test file.

@pytest.fixture()
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })

    # other setup can go here

    yield app

    # clean up / reset resources here


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()

@pytest.fixture()
def test_usernames():
    # organized by the endpoint I want to test them in :)
    
    usernames_for_any_endpoint = {
        VALID_USERNAME_KEY: "test",
        INVALID_USERNAME_KEY: "qwertyuiop"
    }
    return {
        "any": usernames_for_any_endpoint,
        "increment_user_level": {
            VALID_USERNAME_KEY: "TEMP_for_lvl_tsts",
            INVALID_USERNAME_KEY:usernames_for_any_endpoint[INVALID_USERNAME_KEY]
        }
    }

@pytest.fixture()
def add_user_endpoint_name():
    return "/add_user"

@pytest.fixture()
def increment_level_endpoint_name():
    return "/increment_user_level"

# since pyfixtures can't have non fixture arguments, using a class method instead.
class Helpers:
    @staticmethod
    def debug_print_response(response, func_name=""):
        parsed_response = response.data.decode('UTF-8')
        print("*" * 50)
        if func_name:
            print(f"Inside test function: `{func_name}`: ", end="")
        print("Got response", parsed_response)
        print("*" * 50)

@pytest.fixture
def helpers():
    return Helpers
