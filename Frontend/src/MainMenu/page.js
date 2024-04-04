import React, {Component} from 'react';
import { Link } from 'react-router-dom';

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
      <div justifyContent="center" style={{fontSize:'20px'}}>
        <h1 style={{color:'white', fontSize:'100px', textAlign:"center"}}>
          Main Menu
        </h1>
        <h1>
          <CustomButton>Start Game</CustomButton>
          <CustomButton>Load Game</CustomButton>
        </h1>
        <h1>
          <CustomButton to="/ChooseLevel">Choose Level</CustomButton>
        </h1>
        <h1>
          <CustomButton>View Leaderboard</CustomButton>
        </h1>
      </div>
    </div>
  );
}

export default MainMenu;