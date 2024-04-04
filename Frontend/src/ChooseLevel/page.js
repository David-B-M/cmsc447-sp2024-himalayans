import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './ChooseLevel.css'; // Import CSS file for styling

let level = 3; // PLACEHOLDER: this should be picked out from the currLevel column of the database

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
      buttons = <div><CustomButton>Level 1</CustomButton></div>
      break;
    case 2: //Level 2 is currLevel
      buttons = <div><CustomButton>Level 1</CustomButton>
      <CustomButton>Level 2</CustomButton></div>
      break;
    case 3: //Level 3 is currLevel
      buttons = <div><CustomButton>Level 1</CustomButton>
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
      </div>
    </div>
  );
}

export default ChooseLevel;