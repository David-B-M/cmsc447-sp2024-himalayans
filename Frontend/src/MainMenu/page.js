import React, {Component} from 'react';

import {Container} from 'react-bootstrap';

import './MainMenu.css'; // Import CSS file for styling

// @cmgilger
const CustomButton = ({ children }) => {
  return (
    <button className="custom-button">{children}</button>
  );
}

function MainMenu() {
  return (
    <div style={{ backgroundImage: `url('snowy_mountains.jpg')`,  
                        backgroundSize: 'cover',
                        backgroundPosition: 'left', 
                        display: 'flex',
                        height: '100vh',
                        flexDirection: 'column'}}>
      <div className={"control-flow"}>
        <h1 style={{color:'white', fontSize:'100px'}}>
          Main Menu
        </h1>
        <div>
          <CustomButton>Start Game</CustomButton>
          <CustomButton>Choose Level</CustomButton>
          <CustomButton>View Leaderboard</CustomButton>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;