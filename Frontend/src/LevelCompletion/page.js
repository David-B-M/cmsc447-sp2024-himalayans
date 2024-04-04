import "./LevelCompletion.css"
function LevelComplete() {

    return(
        <div className={"LevelComplete"} style={{background: "url('/himalayan-green-background.jpg')", backgroundSize:"cover"}}>
            <div className={"level"}>
                <h1 className={"title"}>Level Failed</h1>
                <button className={"reset"}> Reset Level</button>
                <button className={"quit"}> View Leaderboard</button>
            </div>
    </div>)
}

export default LevelComplete;