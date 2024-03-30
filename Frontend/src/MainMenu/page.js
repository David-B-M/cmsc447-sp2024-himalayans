import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap';

import './MainMenu.css'; // Import CSS file for styling

// @cmgilger
const CustomButton = ({ children, to }) => {
  return (
    <Link to={to} className="custom-button">{children}</Link>
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
      <div justifyContent="center">
        <h1 style={{color:'white', fontSize:'100px', textAlign:"center"}}>
          Main Menu
        </h1>
        <div>
          <CustomButton>Start Game</CustomButton>
          <CustomButton to="/ChooseLevel">Choose Level</CustomButton>
          <CustomButton>View Leaderboard</CustomButton>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;