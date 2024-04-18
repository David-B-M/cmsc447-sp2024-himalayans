import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './ChooseLevel.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const BackButton = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)} className='custom-button'>{children}</button>
    </>
  );
}

//@cmgilger
const CustomButton = ({ children, to }) => {
  return (
    <Link to={to} className="custom-button">{children}</Link>
  );
}


// buttons = <div><CustomButton to="/LevelExample">Level 1</CustomButton>
//       <CustomButton disabled>[LOCKED]</CustomButton>
function ChooseLevel() {
  const [userData, setUserData] = useState([{}])
    const loadUser = () => {
         axios.get("http://localhost:5000/load_users").then(res => {
            setUserData(res.data)
        }
    ).catch(e => {
        console.log(e);
        })
    }

    useEffect(() => {
            loadUser()
    }, [userData]);

  const loadButtons = () => {
    let buttons = []

    // change later to be based off usecontext.
    let levelReached = userData["users"][0]["levelReached"]
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
        <div>
          <BackButton>Go Back</BackButton>
        </div>
      </div>
    </div>
  );
}

export default ChooseLevel;