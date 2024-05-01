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
<<<<<<< Updated upstream
=======

@pytest.fixture()
def test_usernames():
    return {
        "valid_username": "test",
        "invalid_username": "qwertyuiop"
    }

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
>>>>>>> Stashed changes
