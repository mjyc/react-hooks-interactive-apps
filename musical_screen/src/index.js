import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {useAudio} from 'react-use';
import Hammer from 'hammerjs';

import './styles.css';


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
      new Hammer.Tap(),
      new Hammer.Pinch(),
      new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL }),
    ],
  );
  console.log(ev);

  const ev2src = (ev) =>
    ev.type === 'tap'
    ? 'https://raw.githubusercontent.com/aramadia/willow-sound/master/E/E04.ogg'
    : ev.type === 'swipe' && ev.direction === Hammer.DIRECTION_RIGHT
    ? 'https://raw.githubusercontent.com/aramadia/willow-sound/master/E/E11.ogg'
    : ev.type === 'swipe' && ev.direction === Hammer.DIRECTION_LEFT
    ? 'https://raw.githubusercontent.com/aramadia/willow-sound/master/E/E12.ogg'
    : ev.type === 'pinch'
    ? 'https://raw.githubusercontent.com/aramadia/willow-sound/master/E/E08.ogg'
    : 'https://raw.githubusercontent.com/aramadia/willow-sound/master/E/E10.ogg';

  // eslint-disable-next-line
  const [audio, state, controls, _]  = useAudio({
    src: ev2src(ev),
    autoPlay: false,
  });
  console.log(state);

  useEffect(() => {
    if (lastTimeStamp !== ev.timeStamp) {
      controls.play();
      setLastTimeStamp(ev.timeStamp);
    }
  })

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
      {audio}
      <div style={{fontSize: '2em'}}>Tap, swipe, or pinch me!</div>
      <div>{!!ev.type ? `${ev.type}-ed` : ""}</div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
