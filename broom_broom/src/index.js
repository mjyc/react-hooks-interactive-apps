import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDeviceOrientation, useDeviceMotion } from 'the-platform';

import './styles.css';


function App() {
  const { alpha, beta, gamma, absolute } = useDeviceOrientation();
  const { acceleration, rotationRate, interval } = useDeviceMotion();
  console.log(alpha, beta, gamma, absolute);
  console.log(acceleration, rotationRate, interval);

  // useEffect(() => {
  //   if (lastTimeStamp !== ev.timeStamp) {
  //     controls.play();
  //     setLastTimeStamp(ev.timeStamp);
  //   }
  // })

  const divStyle = {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div className="App" style={divStyle}>
      <div style={{fontSize: '2em'}}>Device Orientation</div>
      <div>
        alpha: {alpha} <br />
        beta: {beta} <br />
        gamma: {gamma} <br />
        absolute: {absolute} <br />
      </div>
      <div style={{fontSize: '2em'}}>Device Motion</div>
      <div>
        acceleration.x: {acceleration.x} <br />
        acceleration.y: {acceleration.y} <br />
        acceleration.z: {acceleration.z} <br />
        interval: {interval} <br />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
