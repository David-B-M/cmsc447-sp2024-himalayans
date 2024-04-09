import json

ADD_USER_ENDPOINT = "/add_user"

# reference:
# https://flask.palletsprojects.com/en/3.0.x/testing/#sending-requests-with-the-test-client
def test_add_valid_username(client):

    headers = {
        'Content-Type': "application/json",
    }
    query_dict = {"username": "test1"}

    
    response = client.post(ADD_USER_ENDPOINT,
                           query_string=json.dumps(query_dict),
                           headers=headers)
    parsed_response = response.data.decode('UTF-8')
    print("*" * 40)
    print("Got response:", parsed_response)
    print("*" * 40)
    assert response is not None
    assert response.status_code == 200
