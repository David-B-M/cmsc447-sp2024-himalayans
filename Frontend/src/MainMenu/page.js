import React, {Component} from 'react';

import {Container} from 'react-bootstrap';

import './CustomButton.css'; // Import CSS file for styling

// @cmgilger
const CustomButton = ({ children }) => {
  return (
    <button className="custom-button">{children}</button>
  );
}

function MainMenu() {
  return (
    <div style={{ backgroundImage: `url('main_menu_background.jpg')`,  
                        backgroundSize: 'cover',
                        backgroundPosition: 'left', 
                        display: 'flex',
                        height: '100vh'}}>
      <div bgcolor={theme.palette.background} justifyContent="center">
        <h1 style={{color:'white', fontSize:'100px', textAlign:"center"}}>
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