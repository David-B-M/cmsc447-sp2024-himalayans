import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './ChooseLevel.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

import {AppContext} from "../App";




//@cmgilger
const CustomButton = ({ children, to }) => {
  return (
    <Link to={to} className="custom-button">{children}</Link>
  );
}


function ChooseLevel() {
    const {userData, arrayId} = useContext(AppContext)
    const navigate = useNavigate();
    const goBack = () => {
          navigate(-1)
        }
    let levelReached;
    if(arrayId == -1){
      levelReached = 0;
    }
    else{
      levelReached = parseInt(userData["users"][arrayId]["levelReached"])
    }
  const loadButtons = () => {
    let buttons = []

    // change later to be based off usecontext.
    let i = 0;
    while (i < levelReached) {
      buttons.push(<CustomButton to="/LevelExample">Level {i+1}</CustomButton>)
      i++;
    }

    while (i < 3) {
      buttons.push(<CustomButton disabled>[LOCKED]</CustomButton>)
      i++;
    }
    return buttons
  }

  if (userData["users"] === undefined) {
        return <div> Still loading.... </div>
  }


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
        <div>
        {loadButtons()}
        </div>
        <div style={{marginTop: `10px`}}>
          <button onClick={goBack} className={"custom-button"}>Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default ChooseLevel;