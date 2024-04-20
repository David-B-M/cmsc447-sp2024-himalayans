import React, {useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import Phaser from 'phaser';
import {AppContext} from "../App";
import './MainMenu.css'; // Import CSS file for styling


// @cmgilger
const CustomButton = ({ children, to }) => {
  return (
    <Link to={to} className="custom-button">{children}</Link>
  );
}

class MovingBackgroundClass extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('background', 'snowy_mountains.jpg');
    }

    create ()
    {  
        // create background
        const { width, height } = this.sys.game.canvas;
        this.bg = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0);
        this.bg.setTileScale(2);
    }

    update ()
    {
        // update background
        this.bg.tilePositionX += 2;
    }
}

function MovingBackground()
{
    const config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.RESIZE,
            width: '100%',
            height: '100%'
        },
        backgroundColor: '#304858',
        scene: MovingBackgroundClass,
        autoFocus: false
    };

    const game = new Phaser.Game(config);
    return game;
}

function MainMenu() {
  const {userData, arrayId} = useContext(AppContext)
  let userLoaded = 0;
  let userName = "NULL";
  if(arrayId !== -1){
    userLoaded = 1;
    userName = userData["users"][arrayId]["username"]
  }
  useEffect(() => {
    const game = MovingBackground();
    return () => {
      game.destroy(true); 
    };
  }, []);

  const chooseLevelOption = () => {
    if(userLoaded === 0){
      return <CustomButton disabled>Choose Level [LOCKED]</CustomButton>
    }
    else{
      return <CustomButton to="/ChooseLevel">Choose Level</CustomButton>
    }
  }

  const userNameOption = () => {
    if(userName === "NULL"){
      return <div  style={{color:'white', fontSize:'30px'}}>No User Loaded.</div>
    }
    else{
      return <div  style={{color:'white', fontSize:'30px'}}>Current User: {userName}</div>
    }
  }

  return (
    <div className='menu-content'>
      <div style={{fontSize:'20px'}}>
        <h1 style={{color:'white', fontSize:'100px', textAlign:"center"}}>
          Main Menu
        </h1>
        <h1>
          <CustomButton to="/StartGame">Start or Load Game</CustomButton>
        </h1>
        <h1>
          {chooseLevelOption(userLoaded)}
        </h1>
        <h1>
          <CustomButton to="/ViewLeaderboard">View Leaderboard</CustomButton>
        </h1>
        {userNameOption()}
      </div>
    </div>
  );
}

export default MainMenu;