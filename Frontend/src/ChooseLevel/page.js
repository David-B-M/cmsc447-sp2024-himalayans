import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './ChooseLevel.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LevelValue = ({}) =>{
  axios.get('localhost:5000/load_users')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

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
        <ButtonSwitch currLevel={level} /> 
        <div>
          <BackButton>Go Back</BackButton>
        </div>
      </div>
    </div>
  );
}

export default ChooseLevel;