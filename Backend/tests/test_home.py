"""
Goal:
- make sure data is loaded when the "/" endpoint is called.

Note to self, 
(from following this tutorial:
https://testdriven.io/blog/pytest-for-beginners/
which references this documentation:
https://docs.pytest.org/en/7.1.x/explanation/anatomy.html#test-anatomy)
pytests have 4 components
- arrange the test data
- 


Additionally, we don't have to import the app to run the tests :<)
Reference: 
```
Fixtures defined in a conftest.py can be used by any test in that package without needing to import them (pytest will automatically discover them).
```
https://docs.pytest.org/en/7.1.x/reference/fixtures.html#:~:text=The%20conftest.py%20file%20serves,pytest%20will%20automatically%20discover%20them).
"""


def test_home(client):
    # todo: fill this in!
    response = client.get("/")
    assert response.status_code == 200
    