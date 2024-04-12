import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseLevel.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const currUser = 1;

const LevelValue = ({ currUser }) =>{
  let data = {}
  axios.get('http://127.0.0.1:5000/load_users')
  .then(function (response) {
    data = response.data;
    console.log(response);
    for(let i = 0; i < data["users"].length; i++){
      console.log("index = " + i);
      console.log("id = " + data["users"][i]['user_id']);
      if(data["users"][i]['user_id'] == currUser){
        let level = data["users"][i]['levelReached'];
        console.log(level);
        return level;
      }
    }
  })
  .catch(function (error) {
    console.log(error);
  });

  return 0;
}

const userLevel = LevelValue(currUser);

const BackButton = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)} className='custom-button'>{children}</button>
    </>
  );
}

let level = 1; // PLACEHOLDER: this should be picked out from the currLevel column of the database

//@cmgilger
const CustomButton = ({ children, to }) => {
  return (
    <Link to={to} className="custom-button">{children}</Link>
  );
}

const ButtonSwitch = ({ currLevel }) => { // This determines how the buttons are displayed.
  let buttons;
  switch(currLevel){
    case 1: //Level 1 is currLevel
      buttons = <div><CustomButton to="/LevelExample">Level 1</CustomButton>
      <CustomButton disabled>[LOCKED]</CustomButton>
      <CustomButton disabled>[LOCKED]</CustomButton></div>
      break;
    case 2: //Level 2 is currLevel
      buttons = <div><CustomButton to="/LevelExample">Level 1</CustomButton>
      <CustomButton>Level 2</CustomButton>
      <CustomButton disabled>[LOCKED]</CustomButton></div>
      break;
    case 3: //Level 3 is currLevel
      buttons = <div><CustomButton to="/LevelExample">Level 1</CustomButton>
      <CustomButton>Level 2</CustomButton>
      <CustomButton>Level 3</CustomButton></div>
      break;
    default:
      buttons = <div><CustomButton disabled>[LOCKED]</CustomButton>
      <CustomButton disabled>[LOCKED]</CustomButton>
      <CustomButton disabled>[LOCKED]</CustomButton></div>
  }
  return <div>{buttons}</div>
}

function ChooseLevel() {
  return (
    <div style={{ backgroundImage: `url('snowy_mountains.jpg')`,  
                        backgroundSize: 'cover',
                        backgroundPosition: 'left', 
                        display: 'flex',
                        height: '100vh',
                        flexDirection: 'column'}}>
      <div className={"control-flow"}>
        <h1 style={{color:'white', fontSize:'100px'}}>
          Choose a Level
        </h1>
        <ButtonSwitch currLevel={userLevel} /> 
        <div>
          <BackButton>Go Back</BackButton>
        </div>
      </div>
    </div>
  );
}

export default ChooseLevel;