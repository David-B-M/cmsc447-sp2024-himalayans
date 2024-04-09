LOAD_USER_ENDPOINT = "/load_users"


def test_load(client):
    response = client.get(LOAD_USER_ENDPOINT)
    parsed_response = response.data.decode('UTF-8')
    print("*" * 50)
    print("Inside test_load(), got response", parsed_response)
    print("*" * 50)
    assert response is not None
    assert response.status_code == 200
