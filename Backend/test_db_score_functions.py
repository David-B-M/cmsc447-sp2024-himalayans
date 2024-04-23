
# doesn't work in pytest folder, maybe use closer to when I have an endpoint for it :P
def test_increment_score():
    test_user = "jat101"
    increment_by = 100
    rank = app.db.increment_score(test_user, increment_by)
    print("Got rank = {rank}")

if __name__ == '__main__':
    test_increment_score()