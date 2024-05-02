JSON_LEVEL_KEY = "levelReached"
# note: if "/add_user" is down, manually add a user to simulate the tests below.
# or feel free to comment this one out to do it via the endpoint.

# ~~~~~~~~~~~~~~ NOTE ~~~~~~~~~~~
# To ensure this is run from a fresh state every time
# Go to conftest:test_usernames()
# Add salt or change the username for this endpoint every time
def test_by_starting_creating_temp_user(client, helpers,
                     test_usernames,
                     add_user_endpoint_name, increment_level_endpoint_name):
    username = test_usernames.get(increment_level_endpoint_name, {}).get("valid_username")
    assert username is not None, f"Expected `valid_username` to be set from conftest/test_usernames. Try again!"
    params_dict =  {"username": username}
    response = client.post(add_user_endpoint_name, data=params_dict)
    helpers.debug_print_response(response)
    assert response is not None
    assert response.status_code == 200

# NOTE: I expect that the user was freshly created. Manually delete the user if you plan to re-run these tests from a fresh state :)
def test_increment_level_valid_user(client, helpers, 
                                    test_usernames,
                                    increment_level_endpoint_name):
    """
    the endpoint itself doesn't tell us what the new level value is, so in order to verify the results,
    gotta use the "/read_user_level" endpoint.
    """
    username = test_usernames.get(increment_level_endpoint_name, {}).get("valid_username")
    assert username is not None, f"Expected `valid_username` to be set from conftest/test_usernames. Try again!"
    params_dict =  {"username": username}
    response = client.post(increment_level_endpoint_name, data=params_dict)
    helpers.debug_print_response(response)
    assert response is not None
    assert response.status_code == 200

def test_read_level_to_verify_update(client, test_usernames, increment_level_endpoint_name, read_user_level_endpoint_name):
    username = test_usernames.get(read_user_level_endpoint_name, {}).get("valid_username")
    assert username is not None, f"Expected `valid_username` to be set from conftest/test_usernames. Try again!"
    params_dict =  {"username": username}
    response = client.get(read_user_level_endpoint_name, data=params_dict)
    # HTTP verification
    assert response is not None
    assert response.status_code == 200

    # validate the data wasn't corrupted
    # expecting return {"levelReached": ..., "username": ..., "message": ...}
    level = response.json.get("levelReached", -1)
    assert level != -1, f"Missing key 'levelReached' from endpoint: /read_user_level?username={username}"
    assert level in [1,2,3], f"Expected level to be one of [1,2,3]. Got level = {level}"
    
    # data validation
    # todo: increment again, expect level number = 2, again, expect level = 3, again: expect level stays at 3.
    current_level = response.json.get(JSON_LEVEL_KEY)
    assert current_level is not None, f"Endpoint {increment_level_endpoint_name} missing response json key: `{JSON_LEVEL_KEY}`"
    assert current_level == 2, f"Expected increment result to go from 1 to 2. Instead it went to {current_level}. Make sure you set a fresh user in conftest."