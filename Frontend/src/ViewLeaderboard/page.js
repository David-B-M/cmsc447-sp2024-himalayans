import "./ViewLeaderboard.css"
import {Link} from "react-router-dom";
function ViewLeaderboard() {

    return(<div className={"ViewLeaderboard"} style={{background: "url('/himalayan-green-background.jpg')"}}>
            <div className={"control-flow"}>
                <h1 className={"title"}>Everest the Olympicat <br/>View Leaderboard</h1>
                <Link to={"/"}> <button className={"return"}> <span>Back to Main Menu</span> </button> </Link>
            </div>
    </div>)
}

export default ViewLeaderboard;