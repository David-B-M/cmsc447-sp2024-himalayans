import './App.css';

/* IMPORT YOUR PAGE HERE! */
import MainMenu from "./MainMenu/page"
import ChooseLevel from './ChooseLevel/page'
import StartGame from './StartGame/page'
import ViewLeaderboard from "./ViewLeaderboard/page"
import LevelOne from "./LevelOne/page"
import LevelTwo from "./LevelTwo/page"
import LevelThree from "./LevelThree/page"
import {Routes, Route, Link} from "react-router-dom";
import React, {useState, useEffect, createContext} from 'react'
import axios from "axios";
export const AppContext = createContext()

function App() {
    /* This is an example of getting the api from the backend. */
    const [arrayId, setArrayId] = useState(-1)
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
  return (
    <div className="App">
        <AppContext.Provider value={{userData, arrayId, setArrayId}}>
            <Routes> {/* Routes navbar connects to goes here */}
                <Route path={"/"} element={<MainMenu/>}></Route>
                <Route path={"/StartGame"} element={<StartGame/>}></Route>
                <Route path={"/ChooseLevel"} element={<ChooseLevel/>}></Route>
                <Route path={"/ViewLeaderboard"} element={<ViewLeaderboard/>}></Route>
                <Route path={"/LevelOne"} element={<LevelOne/>}></Route>
                <Route path={"/LevelTwo"} element={<LevelTwo/>}></Route>
                <Route path={"/LevelThree"} element={<LevelThree/>}></Route>
            </Routes>
        </AppContext.Provider>
    </div>
  );
}

export default App;
