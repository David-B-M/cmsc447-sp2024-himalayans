import json

ADD_USER_ENDPOINT = "/add_user"


# reference:
# https://flask.palletsprojects.com/en/3.0.x/testing/#sending-requests-with-the-test-client
def test_add_via_form_with_valid_username(client, test_usernames, helpers,
                                          add_user_endpoint_name):

    headers = {'Content-Type': "application/x-www-form-urlencoded"}
    username =test_usernames.get(add_user_endpoint_name).get("valid_username")
    assert username is not None, f"Expected `valid_username` to be set from conftest/test_usernames. Try again!"
    query_dict = {"username": username}
    response = client.post(ADD_USER_ENDPOINT, data=query_dict, headers=headers)
    helpers.debug_print_response(response)
    assert response is not None
    assert response.status_code == 200
