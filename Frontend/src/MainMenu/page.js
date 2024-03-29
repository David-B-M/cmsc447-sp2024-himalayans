import React, {Component} from 'react';
import "react-bootstrap";

import {Container, Row} from 'react-bootstrap';
import {Typography, Box} from '@mui/material/';

import { useTheme } from '@mui/material/styles';

import './CustomButton.css'; // Import CSS file for styling

// @cmgilger
const CustomButton = ({ children }) => {
  return (
    <button className="custom-button">{children}</button>
  );
}

function MainMenu() {
  const theme = useTheme();
  return (
    <div style={{ backgroundImage: './main_menu_background.jpg',  
                        backgroundSize: 'cover',
                        backgroundPosition: 'left', 
                        display: 'flex',
                        height: '100vh'}}>
      <div className="justify-content-md-center">
        <h1>
          Main Menu
        </h1>
      </div>
      <Row>
        <CustomButton>Start Game</CustomButton>
        <CustomButton>Choose Level</CustomButton>
        <CustomButton>View Leaderboard</CustomButton>
      </Row>
    </div>
  );
}

export default MainMenu;