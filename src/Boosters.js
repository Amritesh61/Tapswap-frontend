import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Boosters.css';

function Boosters({ points, setPoints }) {
  const [boosters, setBoosters] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/boosters')
      .then(response => {
        setBoosters(response.data);
      })
      .catch(error => console.error('Error fetching boosters:', error));
  }, []);

  const handleUpgrade = (booster) => {
    axios.post('http://localhost:5000/api/boosters/upgrade', { booster })
      .then(response => {
        setBoosters(response.data);
        axios.get('http://localhost:5000/api/status')
          .then(response => {
            setPoints(response.data.points);
          })
          .catch(error => console.error('Error fetching status:', error));
      })
      .catch(error => console.error('Error upgrading booster:', error));
  };

  return (
    <div className="boosters-container">
      <h2>Your daily boosters:</h2>
      <div className="daily-boosters">
        <div className="booster">Taping Guru 3/3</div>
        <div className="booster">Full Tank 3/3</div>
      </div>
      <h2>Boosters:</h2>
      <div className="boosters-list">
        {Object.keys(boosters).map((key) => (
          <div className="booster-item" key={key}>
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <span>{boosters[key].cost.toLocaleString()} | Level {boosters[key].level}</span>
            <button onClick={() => handleUpgrade(key)}>Upgrade</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boosters;
