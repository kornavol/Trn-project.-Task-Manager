/* timer template */

import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [btn, setBtn] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (btn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [btn]);
  console.log("rendered");

  return (
    <main>
      <button onClick={() => setBtn((btn) => !btn)}>
        {btn ? "stop" : "start"}
      </button>
      {time}
    </main>
  );
};

export default App;
