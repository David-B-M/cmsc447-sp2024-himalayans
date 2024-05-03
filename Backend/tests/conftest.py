"""
File: conftest.py
Date: 4/6/2024
Author: Flask Documentation + Jess
Description:
This code should allow me to test our endpoints using the pytest app client!

Particularly, I can use any "fixtures" here as variables in any of the tests in this directory. i.e. `app` (all without having to import them!)

~~~~~~~~~~~~~~ IMPORTANT ~~~~~~~~~~~~
if you are running test_increment_level.py,
you MUST either (before each re-run)
- delete the dummy user (the username is specified below in the constant )
- or set a new username to run the test fresh with. (^same location to edit the username)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Skeleton code gathered from this source:
https://flask.palletsprojects.com/en/3.0.x/testing/
"""

import pytest
from flaskr import create_app

# for my test_usernames
VALID_USERNAME_KEY = "valid_username"
INVALID_USERNAME_KEY = "invalid_username"
# endpoint names are set at the top of each individual test file, or here as a fixture, depends on if i re-use the endpoint fr.

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# --------------- /increment_user_level -------------
# ...................................................
# For re-runs of `test_increment_level.py``
# - Make sure to change this value
TEST_FRESH_USER_FOR_INCREMENTING = "TEMP_4_lvl_tsts6"
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
    # if you are going to run "/increment_user_level", change the username every time so it can be created fresh!
    level_endpoint_usernames = {
        VALID_USERNAME_KEY: TEST_FRESH_USER_FOR_INCREMENTING
    }

    all_usernames = {
        "*": usernames_for_any_endpoint,
        "/increment_user_level": level_endpoint_usernames,
        "/read_user_level": level_endpoint_usernames
    }
    return all_usernames

@pytest.fixture()
def add_user_endpoint_name():
    return "/add_user"

@pytest.fixture()
def read_user_level_endpoint_name():
    return "/read_user_level"

@pytest.fixture()
def increment_level_endpoint_name():
    return "/increment_user_level"

# since pyfixtures can't have non fixture arguments, using a class method instead.
class Helpers:
    @staticmethod
    def debug_print_response(response, func_name=""):
        parsed_response = response.data.decode('UTF-8')
        print(" DEBUG PYTEST ".center(50, "*"))
        if func_name:
            print(f"Inside test function: `{func_name}`: ", end="")
        print("Got response\n\t", parsed_response)
        print("*" * 50)

@pytest.fixture
def helpers():
    return Helpers
