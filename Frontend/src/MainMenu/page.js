import React, {Component} from 'react';
import "react-bootstrap";

import {Container} from 'react-bootstrap';
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
    <Container style={{ backgroundImage: `url('main_menu_background.jpg')`,  
                        backgroundSize: 'cover',
                        backgroundPosition: 'left', 
                        display: 'flex',
                        height: '100vh'}}>
      <Row className="justify-content-md-center">
        <Typography variant="h1"
                    color="primary" backgroundColor="secondary">
          Main Menu
        </Typography>
      </Row>
      <Row>
        <CustomButton>Start Game</CustomButton>
        <CustomButton>Choose Level</CustomButton>
        <CustomButton>View Leaderboard</CustomButton>
      </Row>
    </Container>
  );
}

export default MainMenu;