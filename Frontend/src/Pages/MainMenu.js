import React, {Component} from 'react';

import {Container} from 'react-bootstrap';
import {Typography, Box} from '@mui/material/';

import { useTheme } from '@mui/material/styles';

import 'Frontend\src\CustomButton.css'; // Import CSS file for styling

// @cmgilger
const CustomButton = () => {
  return (
    <button className="custom-button">Click Me</button>
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
      <Box bgcolor={theme.palette.background} justifyContent="center">
        <Typography variant="h1"
                    color="primary" backgroundColor="secondary">
          Main Menu
          <CustomButton>Start Game</CustomButton>
          <CustomButton>Choose Level</CustomButton>
          <CustomButton>View Leaderboard</CustomButton>
        </Typography>
      </Box>
    </Container>
  );
}

export default MainMenu;