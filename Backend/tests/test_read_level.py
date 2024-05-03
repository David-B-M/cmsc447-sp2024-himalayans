READ_LEVEL_ENDPOINT = "/read_user_level"

BACKEND_MISSING_LEVEL_RESULT = -1
VALID_LEVEL_NUMBERS_LIST = [1,2,3]

def test_read_level_fake_user(client, test_usernames):
    fake_username = test_usernames.get(READ_LEVEL_ENDPOINT, {}).get("invalid_username",
                test_usernames.get("*").get("invalid_username"))
    response = client.get(READ_LEVEL_ENDPOINT, data={"username": fake_username})
    parsed_response = response.data.decode('UTF-8')
    assert response is not None
    assert response.status_code == 404

def test_read_level_real_user(client, test_usernames, helpers):
    username = test_usernames[READ_LEVEL_ENDPOINT]["valid_username"]
    response = client.get(READ_LEVEL_ENDPOINT, data={"username": username})

    # HTTP verification
    assert response is not None
    assert response.status_code == 200

    # validate the data wasn't corrupted
    # expecting return {"levelReached": ..., "username": ..., "message": ...}
    level = response.json.get("levelReached", BACKEND_MISSING_LEVEL_RESULT)
    assert level != BACKEND_MISSING_LEVEL_RESULT, f"Missing key 'levelReached' from endpoint: /read_user_level?username={username}"
    assert level in VALID_LEVEL_NUMBERS_LIST, f"Expected level to be one of {VALID_LEVEL_NUMBERS_LIST}. Got level = {level}"
    
    result_username = response.json.get("username", None)
    assert result_username is not None, f"Missing key 'result' from endpoint: /read_user_level?username={username}"
    assert result_username == username, f"Username from json isn't same as username sent. Expected it to be {username}. Got {result_username}"

    # don't really care about the message.
