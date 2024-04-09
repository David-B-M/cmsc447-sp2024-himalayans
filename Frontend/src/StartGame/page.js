import React, {Component} from 'react';

import {Container} from 'react-bootstrap';
import './StartGame.css'; // Import CSS file for styling

// @cmgilger
function StartGame() {
  return (
    <div style={{ backgroundImage: `url('snowy_mountains.jpg')`,  
              backgroundSize: 'cover',
              backgroundPosition: 'left', 
              display: 'flex',
              height: '100vh',
              flexDirection: 'column'}}>
      <div className='control-flow'>
        <h1 style={{color:'white', fontSize:'100px', textAlign:"center"}}>
        Start Game 
        </h1>
        <form>
          <label for="username" style={{color:'white', fontSize: '30px'}}>Enter Username: </label>
          <input type="text" id="username" size="30" style={{fontSize: '30px'}}/>
        </form>
      </div>
    </div>
  );
}

export default StartGame;