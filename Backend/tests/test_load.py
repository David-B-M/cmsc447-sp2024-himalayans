def test_load(client):
    url = '/loadUsers/'
    response = client.get(url)
    assert response is not None 
    assert response.json["ok"]
