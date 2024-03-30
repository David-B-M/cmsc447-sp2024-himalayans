import React, {Component} from 'react';


// @cmgilger
function StartGame() {
  return (
    <div style={{ backgroundImage: `url('snowy_mountains.jpg')`,  
                  backgroundSize: 'cover',
                  backgroundPosition: 'left', 
                  display: 'flex',
                  height: '100vh'}}>
      <div justifyContent="center">
        <h1 style={{color:'white', fontSize:'100px', textAlign:"center"}}>
        Start Game 
        </h1>

        <label for="username"><input type="text" id="username"/>Enter a username:</label>
      </div>
    </div>
  );
}

export default StartGame;