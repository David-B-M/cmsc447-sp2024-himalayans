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

/* --------------------- Custom constants --------------------- */
// This is how I (@LT69018) decided to maneuver switching pages/components
// conditions in the App render function just compare and reassign to values from these pageNumbers.
import pageNumbers from './Constants/pageNumbers.js'
/* --------------------- IMPORTING CUSTOM PAGES --------------------- */
// Note to other frontend folk: 
// import your page (component) here!
import MainMenu from './Pages/MainMenu.js'
import ChooseLevel from './Pages/ChooseLevel.js'
/* ------------------------------------------------------------------ */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // start with the main menu when the app boots.
      pageNumber: pageNumbers.MainMenu 
    };
  }


  render() {
    const currentPageNum = this.state.pageNumber;
    if (currentPageNum === pageNumbers.MainMenu) {
      console.log("In App.js - Switching to Main Menu page.");
      return <MainMenu/>;
    } else if (currentPageNum === pageNumbers.ChooseLevel) {
      console.log("In App.js - Switching to ChooseLevel page.");
      return <ChooseLevel/>;
    } 
    console.log("WHOOPS. Haven't imported/checked/rendered that page num yet:", currentPageNum);
  }

}


export default App;