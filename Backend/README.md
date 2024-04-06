# Backend for "Everest the Olympicat"
This folder contains the source code for our Flask backend!

# Build Instructions
Before you begin, make sure to install `pip` and `virtualenv`.
Follow the instructions here to do so:
- https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#prepare-pip

1. Initialize the virtual environment

You can also find these instructions below on https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/

Start from scratch creating your virtual environment by following the python documentation instructions.

Create `.venv` folder by running the following command.
- (Linux) `python3 -m venv .venv`
- (Windows) `py -m venv .venv`

2. Load the `.venv` (+ install dependencies for the first time)!
- (Linux) `source .venv/bin/activate`
- (Windows) `.venv\Scripts\activate`

Install dependencies by running `pip install -r requirements.txt`
This is how it looks on the linux terminal.
```bash
~/cmsc447-sp2024-himalayans/Backend$ source .venv/bin/activate
(venv) ~/cmsc447-sp2024-himalayans/Backend$ pip install -r requirements.txt
```
Once you have installed the requirements in your virtual environment, you won't have to do this again unless you delete your virtual environment again.

3. Run the app!
```bash
flask --app flaskr run --debug
```
You may also just execute `run_backend.sh`

4. Quit the app
You can do Cntrl-C usually to exit (break out of `flask run`).

Deactivate the `.venv` by running the `deactivate` command.

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
