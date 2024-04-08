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
The instructions to do this all manually are below.
If you are running linux, you can skip these and just run
```
bash run_backend.sh
```

Manually run:

The first time you do this, you must initialize a few things.
- set the flask app name (reference: https://flask.palletsprojects.com/en/1.1.x/cli/ )
```bash
$ export FLASK_APP=flaskr
```
Windows CMD:
```cmd
> set FLASK_APP=flaskr
```
Windows PowerShell:
```powershell
> $env:FLASK_APP = "flaskr"
```
- initialize the database by running this command: `flask init-db`
- 

After you've run that, you can just run and re-run the app without re-initializing the datbase.
```bash
flask --app flaskr run --debug
```
(If you're running bash) You may also just execute `run_backend.sh`

4. Quit the app
   
You can do Cntrl-C usually to exit (break out of `flask run`).

Deactivate the `.venv` by running the `deactivate` command.

# Current progress...

## Todo
- [X] call init_db() i.e. in `/` endpoint or even in `__init__.py`
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

# Miscellaneous Notes
General References
- Project Layout modeled after <a href="https://flask.palletsprojects.com/en/2.3.x/tutorial/layout/">Flask Documentation - Project Layout</a>
```
├── flaskr/
│   ├── __init__.py
│   │       Each endpoint is a sub-function in "create_app(...)"
│   │       Todo: GET /create_user, etc. + document
│   │       
│   ├── db.py
│   │       Functions to access the database! 
│   │       
│   ├── schema.sql
│   │       Defines the tables for the "users" and "leaderboard".
│   │       
├── instance/
│   ├── flaskr.sqlite
│   │      This is where all db tables reside after you run `flask init-db`
│   │      
├── tests/
│   ├── conftest.py
│   │      Just a configuration file for pytest. 
│   │      Allows me to access the flask app from each test_*.py 
│   │      
│   ├── test_[endpoint].py
│   │      Usually just one function that tries to assert an endpoint is behaving.
│   │      
└── .venv/
            This only appears after you initialize your virtual environment.
            It holds our python interpreter and packages! i.e. "flask", etc.
```

## How to contribute:
### Make a new endpoint
### Make a new database function `db.py`

- If you're adding to `db.py` your code will probably look something like this.
    ```python
    def new_func_for_db(parameter):
      """
      Description
      :param parameter: 
          Expected format "xyz"
      :return:
          (on success) _____
          (on fail) None
      """
      db = get_db()
      assert db is not None, "Failed to connect to database."
      NEW_FUNC_SQL = """
          SELECT * from users; -- you replace this with what you actually wanna do
          """
      db_cursor = db.cursor()
      execution_result = db_cursor.execute(NEW_FUNC_SQL)  
      # ^ you might want to fetch data from this.
      return SUCCESS_RETURN_VALUE
    ```
  - (this is mostly a note for myself) Remember, you can only execute 1 sql command at a time using `cur.execute(query)`
  - Additionally, you may want to make an `@click` function so that you can test it without running the app.
  - For example, currently I have this command (`flask drop-db`)so that I can re-initialize the tables after deleting them (i.e. if I change `schema.sql`)
    ```python
    @click.command('drop-db')
    def drop_db_command():
        result = drop_db()
        click.echo(f'Successfully dropped tables? {result}')
    ```
    ```bash
    (Backend) ~/cmsc447-sp2024-himalayans/Backend$ flask drop-db
    Getting database connection
    Dropped tables.
    Successfully dropped tables? True
    Closed database connection.
    ```
## Our Tests (Using Pytest library)
Inside the virtual environment `(venv)` you can run this command to execute our tests! (Currently there is one for the "/" endpoint and thats it.)

Reference: https://flask.palletsprojects.com/en/3.0.x/testing/

(run pytest without viewing stdout during successful tests)
```
python -m pytest
```
Apparently, by default, `pytest` doesn't display any output it gets when a test was successful (however it will always show during failed tests). 

To see your output, i.e. my "Successfully pinged [endpoint name] " messages from `flaskr/__init__.py`, run it with the `-s` option after pytest.

(run pytest **WITH** viewing stdout during successful tests)
```
python -m pytest -s
```
Reference: https://stackoverflow.com/a/24617813

### Command line tests (for DEBUGGING)
Additionally, I have the `flask load-db` command to display all the users from the command line.
```bash
(Backend) ~/cmsc447-sp2024-himalayans/Backend$ flask load-users
Getting database connection
Closed database connection.
Loaded users from db:[]
Closed database connection.
```

This way once I implement functionality to add users it'll be easy to display them if I can't get the endpoint to work.

## Running on repl.it
You may have noticed some silly files in the `~/.gitignore`, the reason is because I (@LT69018) did some development on there while my computer has been in the shop.

In the slim chance you are running this app on replit.com
To add the `flask` package in order to run commands like `flask run`, you need to go through the `Packages` and try to install flask through that. Similarly, **Repeat** whichever procedure works for you for each of the remaining packages in `requirements.txt`, if there are any.

That would run a command like this in the Console
```bash
poetry add 'flask ==0.2.10'
```
If it fails i.e. `Could not find a matching version of package flask`, executing that command manually in the Shell without the version worked for me.

```bash
~/cmsc447-sp2024-himalayans$ poetry add 'flask'
Using version ^3.0.2 for flask

Updating dependencies
Resolving dependencies... (4.9s)

Package operations: 7 installs, 0 updates, 0 removals

  • Installing markupsafe (2.1.5)
  • Installing blinker (1.7.0)
  • Installing click (8.1.7)
  • Installing itsdangerous (2.1.2)
  • Installing jinja2 (3.1.3)
  • Installing werkzeug (3.0.2)
  • Installing flask (3.0.2)

Writing lock file
```

Verify you were successfully able to get the requirements by running `pip install -r requirements` in your activated venv.

```bash
(venv) ~/cmsc447-sp2024-himalayans/Backend$ pip install -r requirements.txt 
Requirement already satisfied: ...
...
```
