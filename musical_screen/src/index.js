import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
// import TouchEmulator from 'hammer-touchemulator';
import {useAudio} from 'react-use';

import "./styles.css";

// TouchEmulator();


//------------------------------------------------------------------------------
let l = 0;
let k = 0;
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  l += 1;
  console.log('l', l);

  useEffect(() => {
    k += 1;
    console.log('k', k);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })

  return width;
}


let i = 0;
let j = 0;
function useHammer() {
  const [ev, setEv] = useState({});

  i += 1;
  // console.log('i', i);

  useEffect(() => {
    const el = document.querySelector('#root');
    j += 1;
    // console.log('j', j);
    const mc = new Hammer.Manager(el);

    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    mc.add(new Hammer.Tap());

    mc.on("doubletap", ev => {
      setEv(ev);
    });
    mc.on("tap", ev => {
      setEv(ev);
    });

    return (() => {
      mc.off("doubletap");
      mc.off("tap");
    })
  })

  return ev;
}


function useTimestamp() { //ev) {
  const [timestamp, setTimestamp] = useState(0);

  const ev = useHammer();

  useEffect(() => {
    // console.log(ev);
    // console.log(timestamp, ev.timeStamp);
    if (!!ev.timeStamp && timestamp !== ev.timeStamp) {
      console.log(timestamp, ev.timeStamp, ev);
      setTimestamp(ev.timeStamp);
    }
  });

  return timestamp;
}


//------------------------------------------------------------------------------


function App() {
  // const ev = useHammer();
  // console.log(ev);
  // const [audio, state, controls, ref] = useAudio({
  //   src: 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg',
  //   // src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  //   autoPlay: true,
  // });
  // console.log(state);
  // const ts = useTimestamp();
  // const width = useWindowWidth();
  // console.log(width);
  const ev = useHammer();
  console.log('ev', ev.type);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
