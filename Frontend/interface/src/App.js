import './App.css';
import PauseMenu from "./PauseMenu/page"
import LevelComplete from "./LevelCompletion/page"
import Test from "./Test/page"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import React, {useState, useEffect} from 'react'
function App() {
  const [data, setData] = useState([{}])
  useEffect(() => {
    fetch("/test").then(res => res.json()).then(
        data => {
          setData(data)
          console.log(data.sample)
        }
    )
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url('main_menu_background.jpg')`,  
                        backgroundSize: 'cover',
                        backgroundPosition: 'left', 
                        display: 'flex',
                        height: '100vh'}}>
        <Router>
            <div>
                NAVBAR
                <Link to={"/"}> Home</Link>
                <Link to={"/Pause"}> Pause Menu</Link>
                <Link to={"/LevelComplete"}> Level Complete</Link>
            </div>
            <Routes>
                <Route path={"/"} element={<Test testData={data} />}></Route>
                <Route path={"/Pause"} element={<PauseMenu/>}></Route>
                <Route path={"/LevelComplete"} element={<LevelComplete/>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
