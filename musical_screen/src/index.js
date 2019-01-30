import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import TouchEmulator from 'hammer-touchemulator';
import {useAudio} from 'react-use';

import "./styles.css";

TouchEmulator();


//------------------------------------------------------------------------------
function useHammer() {
  const [ev, setEv] = useState({});

  const el = document.querySelector('#root');
  const mc = new Hammer.Manager(el);

  mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
  mc.add(new Hammer.Tap());

  mc.on("doubletap", ev => {
    setEv(ev);
  });
  mc.on("tap", ev => {
    setEv(ev);
  });

  return ev;
}



//------------------------------------------------------------------------------


function App() {
  const ev = useHammer();
  console.log(ev);
  const [audio, state, controls, ref] = useAudio({
    src: 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg',
    // src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    autoPlay: true,
  });
  console.log(state);
  return (
    <div className="App">
      {audio}
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
