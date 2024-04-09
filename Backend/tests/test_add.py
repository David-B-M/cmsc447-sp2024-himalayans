import json

ADD_USER_ENDPOINT = "/add_user"


def test_add_valid_username(client):

    headers = {
        'Content-Type': "application/json",
    }
    query_dict = {"username": "test1"}

    # reference:
    # https://flask.palletsprojects.com/en/3.0.x/testing/#sending-requests-with-the-test-client
    response = client.post(ADD_USER_ENDPOINT,
                           query_string=json.dumps(query_dict),
                           headers=headers)
    assert response is not None
    assert response.status_code == 200
