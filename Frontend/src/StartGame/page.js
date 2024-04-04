import React, {Component} from 'react';

import {Container} from 'react-bootstrap';

// @dmiddour
function StartGame() {
  return (
    <div style={{ backgroundImage: `url('snowy_mountains.jpg')`,  
                  backgroundSize: 'cover',
                  backgroundPosition: 'left', 

                  height: '100vh'}}>
      <div>
        <h1 style={{color:'white', fontSize:'100px', textAlign:"center"}}>
        Start Game 
        </h1>

        <div>
          <h1 style={{display: 'inline-block', 
                      color:'black', 
                      backgroundColor: 'white', 
                      width: '20vw', 
                      height: '10vh', 
                      textAlign:"center",
                      borderRadius: '15px'}}>Load Game</h1>
        </div>

        <div style={{ height: '50vh',
                      width: '50vw',
                      border: 'solid',
                      backgroundColor: 'white',
                      display: 'inline-block',
                      overflowY: 'scroll'}}>

          <div className="GameSaveList">
            <button style={{height: '15vh', width: '45vw', borderRadius: '15px'}}>Game 3</button>
            <button style={{height: '15vh', width: '45vw', borderRadius: '15px'}}>Game 3</button>
            <button style={{height: '15vh', width: '45vw', borderRadius: '15px'}}>Game 3</button>
            <button style={{height: '15vh', width: '45vw', borderRadius: '15px'}}>Game 3</button>
            <li style={{display: 'inline-block', 
                        height: '15vh',
                        width: '45vw',
                        border: 'solid',
                        borderRadius: '15px'}}>Game 4</li>
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <button style={{height: '10vh', borderRadius: '15px'}}>back</button>
          <button style={{height: '10vh', borderRadius: '15px'}}>new</button>
        </div>
      </div>
    </div>
  );
}

export default StartGame;