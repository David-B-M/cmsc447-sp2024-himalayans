// main menu
// needs buttons for 
/*
1. Start/load (1 button, takes you to a terraria like load page).
- a table of usernames they can select to get back to that id's progress.
- two buttons on the bottom [back] [new]
-

2. Choose level
-> PlayLevel or phaser stuff (tbd)
-> display the status (win/lose) => they have a button to go back to the menu
-> take them back to the main menu.

3. View leaderboard
- a table of stats for each user
- give them a button to press to go back to the main menu.

*/

import './App.css';

import React, {Component} from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Welcome to the Home Page!
      </div>
    );
  }

}

export default App;