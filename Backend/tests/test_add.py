import json

ADD_USER_ENDPOINT = "/add_user"


# reference:
# https://flask.palletsprojects.com/en/3.0.x/testing/#sending-requests-with-the-test-client
def test_add_via_form_with_valid_username(client, test_usernames, helpers):

    headers = {'Content-Type': "application/x-www-form-urlencoded"}
    query_dict = {"username": "formU2s"}

    response = client.post(ADD_USER_ENDPOINT, data=query_dict, headers=headers)
    helpers.debug_print_response(response)
    assert response is not None
    assert response.status_code == 200
