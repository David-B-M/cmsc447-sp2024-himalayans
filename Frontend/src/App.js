import './App.css';

/* IMPORT YOUR PAGE HERE! */
import PauseMenu from "./PauseMenu/page"
import LevelComplete from "./LevelCompletion/page"
import ChooseLevel from './ChooseLevel/page'
import Test from "./Test/page"


import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import React, {useState, useEffect} from 'react'
function App() {
    {/* This is an example of getting the api from the backend. */}
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
    <div className="App">
        <Router> {/* Navbar goes here */}
            <div>
                {/* The navbar below is an example of how to use Navbar until main menu is complete. But for testing purposes,
                When doing something that's going to require a new page like say main menu, add a new link and new route to the page.
                Link to={} connects the navbar to the path. path={} will contain
                 url that represents the page element={} will have the React component that represents the page. */}
                NAVBAR
                <Link to={"/"}> Home</Link>
                <Link to={"/ChooseLevel"}>Choose Level </Link>
                <Link to={"/Pause"}> Pause Menu</Link>
                <Link to={"/LevelComplete"}> Level Complete</Link>
            </div>
            <Routes> {/* Routes navbar connects to goes here */}
                <Route path={"/"} element={<Test testData={data} />}></Route>
                <Route path={"/ChooseLevel"} element={<ChooseLevel/>}></Route>
                <Route path={"/Pause"} element={<PauseMenu/>}></Route>
                <Route path={"/LevelComplete"} element={<LevelComplete/>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
