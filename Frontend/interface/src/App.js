import './App.css';

import React, {useState, useEffect} from 'react'
function App() {
  const [data, setData] = useState([{}])
  useEffect(() => {
    fetch("/").then(res => res.json()).then(
        data => {
          setData(data)
          console.log(data)
        }
    )
  }, []);
  return (
    <div className="App">
        <h1>Sample Data</h1>
    </div>
  );
}

export default App;
