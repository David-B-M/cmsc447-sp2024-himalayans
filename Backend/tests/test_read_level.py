READ_LEVEL_ENDPOINT = "/read_user_level"

def test_read_level_fake_user(client):
    fake_username = "qwertyuiop"
    response = client.get(READ_LEVEL_ENDPOINT, data={"username": fake_username})
    parsed_response = response.data.decode('UTF-8')
    assert response is not None
    assert response.status_code == 404