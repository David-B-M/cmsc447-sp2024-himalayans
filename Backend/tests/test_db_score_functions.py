INCREMENT_SCORE_ENDPOINT = "/increment_score"

def test_increment_score(client, test_usernames, debug_print_response):
    test_user = test_usernames.get("valid_username")
    levelScore = "lv1"
    score = 100
    params_dict = {"username": test_user, "levelScore": levelScore, "score": score}
    response = client.get(INCREMENT_SCORE_ENDPOINT, data=params_dict)
    debug_print_response(response)
    assert response is not None
    assert response.status_code == 200