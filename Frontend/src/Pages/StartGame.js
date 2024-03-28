import React, {Component} from 'react';

import {Container} from 'react-bootstrap';
import {Typography, Box} from '@mui/material/';

import { useTheme } from '@mui/material/styles';

// @cmgilger
function StartGame() {
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
          Start Game
        </Typography>

        <label for="username"><input type="text" id="username"/>Enter a username:</label>
      </Box>
    </Container>
  );
}

export default StartGame;