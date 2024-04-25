import React, { useContext, useState} from 'react';
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
    const [name, setName] = useState("")
    const {userData, setArrayId} = useContext(AppContext)
    const navigate = useNavigate()
    const updateName = (event) => {
        setName(event.target.value)
    }

    const config = {
        username: name
    }
    const postData = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5000/add_user', querystring.stringify(config), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const leaderboard = () => {
      let leaderboardList = []
      let i = 0;
      leaderboardList.push(
        <div style={{height: '10vh',
                      width: '50vw',
                      display: 'flex',
                      border: 'solid',
                      borderRadius: '15px',
                      backgroundColor: 'white',}}>
          <div style={{height: '10vh',
                      width: '10vw',
                      display: 'flex',
                      margin: 'auto',
                      fontSize: 'xx-large',
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      marginTop: '1vh'}}
                      >Rank</div>
          <div style={{height: '10vh',
                      width: '15vw',
                      display: 'flex',
                      margin: 'auto',
                      fontSize: 'xx-large',
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      marginTop: '1vh'}}
                      >Name</div>
          <div style={{height: '10vh',
                      width: '15vw',
                      display: 'flex',
                      margin: 'auto',
                      fontSize: 'xx-large',
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      marginTop: '1vh'}}
                      >Score</div>
        </div>
      )
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

  if (userData["users"] === undefined) {
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