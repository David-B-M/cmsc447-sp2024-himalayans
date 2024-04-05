# Backend for "Everest the Olympicat"
This folder contains the source code for our Flask backend!

# Build Instructions
1. Initialize the virtual environment
```bash
flask --app flaskr run --debug
```
You may also just execute `run_backend.sh`

Make sure you have flask installed!


# Current progress...

## Todo
- [ ] call init_db() i.e. in `/` endpoint or even in `__init__.py`
- [ ] Fully Document the expected parameters and returns for the HTTP requests below.

### __HTTP Requests__

```
POST add_user?name
```
- Usage: Frontend StartGame page.
- when user presses `[New Game]` and enters their name, send it to the backend to validate and save!

```
GET load_users
```
- Usage: Frontend StartGame page.
- return the information from the users table so that the frontend can display "save files" (usernames and the levels they reached + maybe their highscore). 

```
GET user_level?username="[username]"
```
- Usage: Frontend ChooseLevel page.
- Will be used in Connor's switch statement to determine which levels are disabled
- (i.e. can't chose from 2 if they only haven't level 1)

```
POST save_score
Expects {body:{username: "...", score: ..N..}}
```
- Usage: Frontend LevelComplete page (which gets this information from PlayLevel)

```
GET load_leaderboard
```
- Usage: Frontend ViewLeaderboard page.
- [ ] todo: figure out format we want to return the data for displaying.


## In Progress
- load_users() method. will allow HTTP GET request.
  - Usage: displaying saves to load from on frontend. (StartGame)
 

## Complete
- schema.sql (Define tables `users` and `leaderboard`)
