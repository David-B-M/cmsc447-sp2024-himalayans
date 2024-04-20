import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
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
    let userName;
    if(arrayId === -1){
      levelReached = 0;
      userName = "NULL"
    }
    else{
      levelReached = parseInt(userData["users"][arrayId]["levelReached"])
      userName = userData["users"][arrayId]["username"]
    }
  const loadButtons = () => {
    let buttons = []

    // change later to be based off usecontext.
    let i = 0;
    while (i < levelReached) {
      if(i === 0){
        buttons.push(<CustomButton to="/LevelOne">Level 1</CustomButton>)
      }
      if(i === 1){
        buttons.push(<CustomButton to="/LevelTwo">Level 2</CustomButton>)
      }
      if(i === 2){
        buttons.push(<CustomButton to="/LevelThree">Level 3</CustomButton>)
      }
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
        <div  style={{color:'white', fontSize:'30px'}}>Current User: {userName}</div>
      </div>
    </div>
  );
}

export default ChooseLevel;