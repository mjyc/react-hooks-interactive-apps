import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {useAudio} from 'react-use';
import Hammer from 'hammerjs';
import TouchEmulator from 'hammer-touchemulator';

import './styles.css';


TouchEmulator();


function useHammer(element, recognizers) {
  const [ev, setEv] = useState({});

  const mc = new Hammer.Manager(element);
  recognizers.map(recognizer => mc.add(recognizer));

  useEffect(() => {
    recognizers.map(recognizer =>
      mc.on(recognizer.options.event, ev => {
        setEv(ev);
      })
    );

    return (() => {
      recognizers.map(recognizer =>
        mc.off(recognizer.options.event)
      );
    });
  })

  return ev;
}


function App() {
  const [lastTimeStamp, setLastTimeStamp] = useState(0);

  const ev = useHammer(
    document.getElementById('root'),
    [
      new Hammer.Tap({ event: 'doubletap', taps: 2 }),
      new Hammer.Pinch(),
      new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL }),
    ],
  );

  const ev2src = (ev) =>
    ev.type === 'doubletap'
    ? 'https://raw.githubusercontent.com/aramadia/willow-sound/master/E/E04.ogg'
    : ev.type === 'pinch'
    ? 'https://raw.githubusercontent.com/aramadia/willow-sound/master/E/E11.ogg'
    : ev.type === 'pinch'
    ? 'https://raw.githubusercontent.com/aramadia/willow-sound/master/E/E08.ogg'
    : 'https://raw.githubusercontent.com/aramadia/willow-sound/master/E/E10.ogg';

  console.log(ev)

  let [audio, state, controls, ref]  = useAudio({
    src: ev2src(ev),
    autoPlay: false,
  });
  useEffect(() => {
    if (lastTimeStamp !== ev.timeStamp) {
      // controls.play();
      setLastTimeStamp(ev.timeStamp);
    }
  })

  return (
    <div className="App">
      {audio}
      <h1>{ev.type} {ev.scale} {ev.isFinal} Hello CodeSandbox {lastTimeStamp}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
