import React from 'react';
import ReactDOM from 'react-dom';
import {useDeviceOrientation, useDeviceMotion} from 'the-platform';

import './styles.css';


function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function App() {
  const {alpha, beta, gamma, absolute} = useDeviceOrientation();
  console.log('alpha', alpha, 'beta', beta, 'gamma', gamma, 'absolute', absolute);
  const {acceleration, rotationRate, interval} = useDeviceMotion();
  console.log('acceleration', acceleration, 'rotationRate', rotationRate, 'interval', interval);

  if (Math.abs(acceleration.x) > 2 || Math.abs(acceleration.y) > 2) {
    navigator.vibrate(200);
  } else if (Math.abs(acceleration.x) > 4 || Math.abs(acceleration.y) > 4) {
    navigator.vibrate(400);
  }

  const divStyle = {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return !isAndroid() ? (
    <div style={divStyle}>
      <h1>This app only works on Android devices</h1>
      <h2>Please try it on an an Android device</h2>
    </div>
  ) : (
    <div className="App" style={divStyle}>
      <div style={{ fontSize: "2em" }}>Device Orientation</div>
      <div>
        alpha: {alpha} <br />
        beta: {beta} <br />
        gamma: {gamma} <br />
      </div>
      <div style={{ fontSize: "2em" }}>Device Motion</div>
      <div>
        acceleration.x: {acceleration.x} <br />
        acceleration.y: {acceleration.y} <br />
        acceleration.z: {acceleration.z} <br />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
