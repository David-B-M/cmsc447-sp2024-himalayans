"""
File: conftest.py
Date: 4/6/2024
Author: Flask Documentation + Jess
Description:
This code should allow me to test our endpoints using the pytest app client!

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
