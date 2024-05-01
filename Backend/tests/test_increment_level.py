
# note: if "/add_user" is down, manually add a user to simulate the tests below.
def test_by_starting_creating_temp_user(client, helpers,
                     test_usernames,
                     add_user_endpoint_name):
    params_dict = {"username": test_usernames["increment_user_level"]["valid_username"]}
    response = client.post(add_user_endpoint_name, data=params_dict)
    helpers.debug_print_response(response)
    assert response is not None
    assert response.status_code == 200

# NOTE: I expect that the user was freshly created. Manually delete the user if you plan to re-run these tests from a fresh state :)
def test_increment_level_valid_user(client, helpers, 
                                    test_usernames,
                                    increment_level_endpoint_name):
    params_dict =  {"username": test_usernames["increment_user_level"]["valid_username"]}
    response = client.post(increment_level_endpoint_name, data=params_dict)
    helpers.debug_print_response(response)
    assert response is not None
    assert response.status_code == 200
    # todo: increment again, expect level number = 2, again, expect level = 3, again: expect level stays at 3.