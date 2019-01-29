import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";


//------------------------------------------------------------------------------
import {useState, useEffect} from "react";
import Hammer from 'hammerjs';
console.log(Hammer);

function hammer() {
  const myElement = document.querySelector('#root');
  const myOptions = {};

  const [ev, setEv] = useState('');

  const hammertime = new Hammer(myElement, myOptions);
  hammertime.on('swipe', function(ev) {
    console.log(ev.angle);
    setEv(JSON.stringify(ev.angle));
  });

  return ev;
}

//------------------------------------------------------------------------------


function App() {
  const evStr = hammer();
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{evStr}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
