import "./PauseMenu.css"
function PauseMenu() {

    return(<div className={"PauseMenu"} style={{background: "url('/himalayan-green-background.jpg')", backgroundSize:"cover"}}>
            <div className={"control-flow"}>
                <h1 className={"title"}>Everest the Olympicat <br/>Pause Menu</h1>
                <button className={"resume"}> Resume Game </button>
                <button className={"reset"}> Reset Level </button>
                <button className={"quit"}> Quit Level </button>
                <button className={"return"}> <span>Back to Main Menu</span> </button>
            </div>
    </div>)
}

export default PauseMenu;