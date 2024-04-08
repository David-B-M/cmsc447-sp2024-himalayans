import json


def test_add_valid_username(client):
    # todo: fill this in
    headers = {
        'Content-Type': "application/json",
    }
    data = {"username": "abc12"}
    url = '/addUser/'

    # reference: https://stackoverflow.com/a/45752511
    response = client.post(url, data=json.dumps(data), headers=headers)
    assert response is not None
    assert response.json["ok"]
