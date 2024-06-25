import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import vaultImage from './vault.png';

function App() {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(5500);

  useEffect(() => {
    // Fetch initial status
    axios.get('http://localhost:5000/api/status')
      .then(response => {
        setPoints(response.data.points);
        setEnergy(response.data.energy);
      })
      .catch(error => console.error('Error fetching status:', error));
  }, []);

  const handleTap = () => {
    axios.post('http://localhost:5000/api/tap')
      .then(response => {
        setPoints(response.data.points);
        setEnergy(response.data.energy);
      })
      .catch(error => console.error('Error updating status:', error));
  };

  return (
    <div className="container">
      <header>
        <h1>TapSwap Bot</h1>
        <p>{(points / 1000).toFixed(3)} M</p>
        <p className="legendary">Legendary</p>
      </header>
      <main>
        <div className="vault" onClick={handleTap}>
          <img src={vaultImage} alt="Vault" />
        </div>
        <div className="energy-bar">
          <span>{energy}/5500</span>
          <div className="energy" style={{ width: `${(energy / 5500) * 100}%` }}></div>
        </div>
      </main>
      <footer>
        <div className="menu">
          <button className="menu-item">Ref</button>
          <button className="menu-item">Task</button>
          <button className="menu-item">Tap</button>
          <button className="menu-item">Boost</button>
          <button className="menu-item">Stats</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
