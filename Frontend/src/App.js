import './App.css';

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
    <div className="App">
        <h1>Sample Data</h1>
        {data.sample.map((sample_data, key) => {
            return <p>{sample_data}</p>
        })}
    </div>
  );
}

export default App;
