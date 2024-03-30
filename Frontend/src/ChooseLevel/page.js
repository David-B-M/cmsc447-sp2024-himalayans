import React, {Component} from 'react';

import './ChooseLevel.css'; // Import CSS file for styling

//@cmgilger
const CustomButton = ({ children }) => {
  return (
    <button className="custom-button">{children}</button>
  );
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
        <div> 
          <CustomButton>Level 1</CustomButton>
          <CustomButton>Level 2</CustomButton>
          <CustomButton>Level 3</CustomButton>
        </div>
      </div>
    </div>
  );
}

export default ChooseLevel;