Problem: (3/25) Was unable to start up Frontend (react skeleton).
`sh: react-scripts: command not found` 

Source: 
<a href="https://stackoverflow.com/questions/47612580/react-scripts-command-not-found">Stackoverflow</a>

Resolution: 
When starting up the frontend for the first time on a local copy of the Repo...

1. Delete the old package-lock.json 
2. Run `npm install`
3. Now you can run `npm start`

# Development Frameworks
Frontend is built using <a href="https://react.dev/">ReactJS</a> (see `./Frontend`) as well as the <a href="https://phaser.io/">phaser</a> (see `./phaser_code`).

Backend is built using <a href="https://flask.palletsprojects.com/en/3.0.x/">Flask</a> (see `./Backend`)