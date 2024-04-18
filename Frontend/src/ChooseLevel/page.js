import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseLevel.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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

function ChooseLevel() {
  let currUser = 1;
  let currLevel = 0;
  const [data, setData] = useState([{}])
  //const [name, setName] = useState("")
  const loadUser = () => {
        axios.get("http://localhost:5000/load_users").then(res => {
          setData(res.data)
          console.log(data)
      }
  ).catch(e => {
      console.log(e);
      })
  }
  useEffect(() => {
      loadUser()
  }, []);
  //}
  //let currLevel = LevelValue(currUser);

  for(let i = 0; i < data["users"].length; i++){
    if(Number(currUser) == Number(data["users"][i]['user_id'])){
      //console.log("levelReached = " + data["users"][i]['levelReached'])
      let level = data["users"][i]['levelReached'];
      console.log("LevelValue: Level returned: " + level);
      currLevel = level;
    }
  };

  const ButtonSwitch = () => { // This determines how the buttons are displayed.
    let buttons;
    //let currLevel = level;
    console.log("ButtonSwitch: level = " + Number(currLevel));
    //switch(Number(currLevel)){
    if(Number(currLevel) == 1){ //Level 1 is currLevel
      buttons = <div><CustomButton to="/LevelExample">Level 1</CustomButton>
      <CustomButton disabled>[LOCKED]</CustomButton>
      <CustomButton disabled>[LOCKED]</CustomButton></div>
    }
    if(Number(currLevel) == 2){ //Level 2 is currLevel
      buttons = <div><CustomButton to="/LevelExample">Level 1</CustomButton>
      <CustomButton>Level 2</CustomButton>
      <CustomButton disabled>[LOCKED]</CustomButton></div>
      //break;
    }
    if(Number(currLevel) == 3){ //Level 3 is currLevel
      buttons = <div><CustomButton to="/LevelExample">Level 1</CustomButton>
      <CustomButton>Level 2</CustomButton>
      <CustomButton>Level 3</CustomButton></div>
      //break;
    }
    else{
      buttons = <div><CustomButton disabled>Please Load Game and Return!</CustomButton></div>
    }
    //}
    return <div>{buttons}</div>
  }

  console.log("ChooseLevel: LevelValue = " + currLevel);
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
        <ButtonSwitch/> 
        <div>
          <BackButton>Go Back</BackButton>
        </div>
      </div>
    </div>
  );
}

export default ChooseLevel;