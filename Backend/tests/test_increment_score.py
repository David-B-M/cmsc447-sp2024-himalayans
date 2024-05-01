INCREMENT_SCORE_ENDPOINT = "/increment_score"

def test_increment_score(client, test_usernames, helpers):
    test_user = test_usernames.get("valid_username")
    levelScore = "lv1Score"
    score = 100
    params_dict = {"username": test_user, "levelScore": levelScore, "score": score}
    response = client.post(INCREMENT_SCORE_ENDPOINT, data=params_dict)
    helpers.debug_print_response(response)
    assert response is not None
    assert response.status_code == 200

def test_increment_score_invalid_username(client, test_usernames, helpers):
    # expecting error 404 with an invalid username message.
    test_user = test_usernames.get("invalid_username")
    levelScore = "lv1Score"
    score = 100
    params_dict = {"username": test_user, "levelScore": levelScore, "score": score}
    response = client.post(INCREMENT_SCORE_ENDPOINT, data=params_dict)
    helpers.debug_print_response(response)
    assert response is not None
    assert response.json.get("success") == False
    assert response.status_code == 404