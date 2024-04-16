import "./ViewLeaderboard.css"
import { useNavigate } from 'react-router-dom';

const BackButton = ({ children }) => {
    const navigate = useNavigate();
  
    return (
      <>
        <button onClick={() => navigate(-1)} className='custom-button'>{children}</button>
      </>
    );
  }

function ViewLeaderboard() {

    return (
        <div style={{ backgroundImage: `url('snowy_mountains.jpg')`,  
                            backgroundSize: 'cover',
                            backgroundPosition: 'left', 
                            display: 'flex',
                            height: '100vh',
                            flexDirection: 'column'}}>
          <div className={"control-flow"}>
            <div>
              <BackButton>Go Back</BackButton>
            </div>
          </div>
        </div>
      );
}

export default ViewLeaderboard;