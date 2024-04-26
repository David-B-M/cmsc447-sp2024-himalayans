import React, { useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './StartGame.css';
import axios from "axios";
import querystring from 'qs'
import {AppContext} from "../App";
const CustomButton = ({ children, to }) => {
  return (
        <Link to={to} className="custom-button">{children}</Link>
  );
}

const CustomGameSave = ({children, id, onClick}) => {
  return (
    <button id={id} className="gamesave" onClick={ (e) => onClick(e)}>{children}</button>
  );
}

const NewGame = ({children}) => {
  return(
    <button className="new-game" onClick={popup}>{children}</button>
  );
}
function popup() {
  var form = document.getElementById('popup');
  if(form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

// @dmiddour
function StartGame() {
    const [name, setName] = useState("")
    const {userData, setArrayId} = useContext(AppContext)
    const navigate = useNavigate()
    const updateName = (event) => {
        setName(event.target.value)
    }

    const postData = (event) => {
        const config = {
            username: name
        }
        event.preventDefault()
        axios.post('http://localhost:5000/add_user', querystring.stringify(config), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



const currentUser = (event) => {
        event.preventDefault()
        let target_id = parseInt(event.target.id)
        for (let i = 0; i < userData["users"].length; i++) {
            if (userData["users"][i]["user_id"] === target_id) {
                setArrayId(i)
                navigate("/ChooseLevel")
                return
            }
        }
    }


    const gameSave = () => {
        let loadGameButtons = []
        let i = 0;
        while (i < userData["users"].length) {
            loadGameButtons.push(<CustomGameSave id={userData["users"][i]["user_id"]} onClick = {currentUser}> {userData["users"][i]["username"]} </CustomGameSave>)
            i++
        }
        return loadGameButtons
    }

    if (userData["users"] === undefined) {
        return <div> Still loading.... </div>
    }

  return (
    <div style={{ backgroundImage: `url('snowy_mountains.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'left', 
                  display: 'flex',
                  justifyContent: 'center'}}>

      <div>
        <div style={{display: 'inline-flex', height: '20vh'}}>
          <h1 style={{color:'white', fontSize:'70px', textAlign:"center"}}>
          Start Game
          </h1>
        </div>
      

        
        <div>
          <h1 style={{display: 'inline-block', 
                      color:'black', 
                      backgroundColor: 'white', 
                      width: '20vw', 
                      height: '10vh', 
                      marginBottom: '0',
                      textAlign:"center",
                      borderRadius: '15px'}}>Load Game</h1>
        </div>

        <div className='saved-game-box'>

          <div className="GameSaveList">
              {gameSave()}
          </div>
        </div>

        <div style={{display: '', marginTop: '20px'}}>
          <CustomButton to={"/"}>Back</CustomButton>
          <NewGame>New Game</NewGame>
        </div>
      </div>
      <div id='popup'>
        <h1>Create New user</h1>
        <form method='post' onSubmit={postData} style={{marginTop: '100px', marginBottom: '100px'}}>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name2' id='name' autoComplete='off' onChange={updateName}></input>
        <button type={"submit"}>Submit</button>
        </form>
        <NewGame>Close</NewGame>
      </div>
    </div>
  );
}

export default StartGame;