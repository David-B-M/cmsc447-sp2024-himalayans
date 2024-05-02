import React, {useEffect, useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './ViewLeaderboard.css';
import axios from "axios";
import querystring from 'qs'
import {AppContext} from "../App";

const CustomButton = ({ children, to }) => {
  return (
        <Link to={to}> <button className="customButton">{children} </button> </Link>
  );
}



// @dmiddour
function Leaderboard() {
    const [leaderBoard, setLeaderBoard] = useState([{}])

    const loadLeaderBoard = () => {
      axios.get("http://localhost:5000/load_leaderboard").then(res => {
         setLeaderBoard(res.data)
         //console.log(leaderBoard)
      }
      ).catch(e => {
          console.log(e);
          })
    }

    useEffect(() => {
      loadLeaderBoard()
    }, []);

    const leaderboard = () => {
      let leaderboardList = []
      let i = 0;
      leaderboardList.push(
        <div className='leaderboardTitle'>
          <div className='leaderboardTitleRank'>Rank</div>
          <div className='leaderboardTitleName'>Name</div>
          <div className='leaderboardTitleName'>Score</div>
        </div>
      )
      while (i < leaderBoard["rows"].length) {
          leaderboardList.push(
          <div className='leaderboardItem'>
            <div className='rank'><p className='itemText'>{i+1}</p></div>
            <div className='name'><p className='itemText'>{leaderBoard["rows"][i]["username"]}</p></div>
            <div className='name'><p className='itemText'>{leaderBoard["rows"][i]["totalScore"]}</p></div>
          </div>)
          i++
      }
      while (i < 5) {
        leaderboardList.push(
          <div className='leaderboardItem'>
            <div className='rank'></div>
            <div className='name'></div>
            <div className='name'></div>
          </div>)
          i++
      }
      return leaderboardList
  }

  
  if (leaderBoard["rows"] === undefined) {
      return <div> Still loading.... </div>
  }
  


  return (
    <div style={{ backgroundImage: `url('snowy_mountains.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'left'}}>
      
      <div style={{display: 'flex'}}>
        <CustomButton to={"/"}>Back to Main Menu</CustomButton>
        <h1 className='title'>Everest the Olympicat <br/>Leaderboard</h1>
      </div>
      
      <div style={{display: 'block',
                justifyContent: 'center'}}>

        <div style={{display: 'inline-block',
                  justifyContent: 'center'}}>
          {leaderboard()}
        </div>

      </div>

    </div>
  );
}

export default Leaderboard;