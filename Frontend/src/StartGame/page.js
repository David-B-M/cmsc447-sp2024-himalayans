import React, {createContext, useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import './StartGame.css';
import axios from "axios";
import querystring from 'qs'
const CustomButton = ({ children, to }) => {
  return (
        <Link to={to} className="custom-button">{children}</Link>
  );
}

const CustomGameSave = ({children, id, onClick}) => {
  return (
    <button id={id} className="gamesave" onClick={(e) => onClick(e)}>{children}</button>
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
/*
let change = 0;
let targetID = null;
function changeUser(ID) {
  change = 1;
  targetID = ID;
}
*/

//const UserContext = createContext(null);

// @dmiddour
function StartGame({updateUser, getUser}) {
    const [data, setData] = useState([{}])
    const [name, setName] = useState("")
    const [user, setUser] = useState([])
    const loadUser = () => {
         axios.get("http://localhost:5000/load_users").then(res => {
            setData(res.data)
            //console.log(data)
        }
    ).catch(e => {
        console.log(e);
        })
    }

    useEffect(() => {
            loadUser()
    }, [data]);


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
    
    const saveUser = (event) => {
      const id = event.target.id;
      console.log(id);
      //updateUser(data["users"][id-1]);
      /*
      setUser(prevData => {
        const updatedUsers = [...prevData["users"]];
        const updatedUser = updatedUsers[id - 1];
        
        // Call updateUser with the updated user
        updateUser(updatedUser);
        
        return { ...prevData, users: updatedUsers };
      });
      */
     setUser(data["users"][id-1]);
     updateUser(user);
    }
    
    useEffect(() => {
      // This will be triggered whenever data changes
      if (user) {
          //console.log("Data updated:", data["users"]);
          // Assuming you want to update the user every time data changes
          updateUser(user);
      }
    }, [user]);
    

    const gameSave = () => {
        let loadGameButtons = []
        let i = 0;
        while (i < data["users"].length) {
            //loadGameButtons.push(<CustomGameSave id={data["users"][i]["user_id"]} onClick={saveUser(data["users"][i]["user_id"])}> {data["users"][i]["username"]} </CustomGameSave>)
            loadGameButtons.push(<CustomGameSave id={data["users"][i]["user_id"]} onClick={saveUser}> {data["users"][i]["username"]} </CustomGameSave>)
            //loadGameButtons.push(<CustomGameSave id={data["users"][i]["user_id"]}> {data["users"][i]["username"]} </CustomGameSave>)
            i++
        }
        /*
        while (i < 5) {
            loadGameButtons.push(<CustomGameSave id={i+1}>Game {i+1} </CustomGameSave>)
            i++
        }
        */
        return loadGameButtons
    }

    if (data["users"] === undefined) {
        return <div> Still loading.... </div>
    }

    /*
    const displayUser = () => {
      return user
    }
    */

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
          <h1>{getUser()}</h1>
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