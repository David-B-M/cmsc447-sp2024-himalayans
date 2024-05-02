LOAD_USER_ENDPOINT = "/load_users"


def test_load(client):
    response = client.get(LOAD_USER_ENDPOINT)
    assert response is not None
    assert response.status_code == 200
