INCREMENT_SCORE_ENDPOINT = "/increment_score"

# copied from test_increment_level after I know it works
def test_by_starting_creating_temp_user(client, helpers,
                     test_usernames,
                     add_user_endpoint_name, increment_score_endpoint_name):
    username = test_usernames.get(increment_score_endpoint_name, {}).get("valid_username")
    assert username is not None, f"Expected `valid_username` to be set from conftest/test_usernames. Try again!"
    params_dict =  {"username": username}
    response = client.post(add_user_endpoint_name, data=params_dict)
    # helpers.debug_print_response(response)
    assert response is not None
    assert response.status_code == 200

def test_increment_score(client, test_usernames, helpers, 
                         increment_score_endpoint_name):
    username = test_usernames.get(increment_score_endpoint_name, {}).get("valid_username")
    assert username is not None, f"Expected `valid_username` to be set from conftest/test_usernames. Try again!"
    levelScore = "lv1Score"
    score = 100
    params_dict = {"username": username, "levelScore": levelScore, "score": score}
    response = client.post(INCREMENT_SCORE_ENDPOINT, data=params_dict)
    # helpers.debug_print_response(response)
    assert response is not None
    assert response.status_code == 200

def test_increment_score_invalid_username(client, test_usernames, helpers,
                                          increment_score_endpoint_name):
    # expecting error 404 with an invalid username message.
    test_user = test_usernames.get(increment_score_endpoint_name, {}).get("invalid_username",
                test_usernames.get("*").get("invalid_username"))
    assert test_user is not None, f"Expected `valid_username` to be set from conftest/test_usernames. Try again!"
    levelScore = "lv1Score"
    score = 100
    params_dict = {"username": test_user, "levelScore": levelScore, "score": score}
    response = client.post(increment_score_endpoint_name, data=params_dict)
    # helpers.debug_print_response(response)
    assert response is not None
    assert response.json.get("success") == False
    assert response.status_code == 404