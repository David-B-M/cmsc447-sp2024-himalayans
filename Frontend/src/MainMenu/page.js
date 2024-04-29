import React, {useEffect, useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import Phaser from 'phaser';
import {AppContext} from "../App";
import './MainMenu.css';
import axios from "axios";


// @cmgilger
const CustomButton = ({ children, to}) => {
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
    const [leaderBoard, setLeaderBoard] = useState([{}])
    let userLoaded = 0;
    let userName = "NULL";

    if(arrayId !== -1) {
    userLoaded = 1;
    userName = userData["users"][arrayId]["username"]
    }

    useEffect(() => {
        const game = MovingBackground();
        return () => {
          game.destroy(true);
        };
    }, []);

    useEffect(() => {
        loadLeaderBoard()
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
      return <div  style={{color:'white', fontSize:'30px', fontWeight: 'bold', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black'}}>No User Loaded.</div>
    }
    else{
      return <div  style={{color:'white', fontSize:'30px', fontWeight: 'bold', WebkitTextStroke: '1px', WebkitTextStrokeColor: 'black'}}>Current User: {userName}</div>
    }
    }

    const loadLeaderBoard = () => {
         axios.get("http://localhost:5000/load_leaderboard").then(res => {
            setLeaderBoard(res.data)
         }
    ).catch(e => {
        console.log(e);
        })
    }


    const uploadResults = () => {
        if(leaderBoard["rows"].length < 5) {
            console.log("not enough users.")
            console.log(leaderBoard["rows"])
            return
        }

        const config = {
           data: [{
               "Group":"Himalayan",
               "Title": "Top 5 Scores",
               [leaderBoard["rows"][0]["username"]]: `${leaderBoard["rows"][0]["totalScore"]}`,
               [leaderBoard["rows"][1]["username"]]: `${leaderBoard["rows"][1]["totalScore"]}`,
               [leaderBoard["rows"][2]["username"]]: `${leaderBoard["rows"][2]["totalScore"]}`,
               [leaderBoard["rows"][3]["username"]]: `${leaderBoard["rows"][3]["totalScore"]}`,
               [leaderBoard["rows"][4]["username"]]: `${leaderBoard["rows"][4]["totalScore"]}`,
            }]
        }

        postData(config)
    }

    const postData = (config) => {
        axios.post('http://localhost:5000/json', JSON.stringify(config), {headers: {'Content-Type': 'application/json'}})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  return (
      <div className='menu-content'>
          <div className={"container"}>
              <button className={"submit-btn"} onClick={uploadResults}>Submit Results</button>
          </div>
          <div style={{fontSize: '20px'}}>

              <h1 style={{color: 'white', fontSize: '100px', textAlign: "center"}}>
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