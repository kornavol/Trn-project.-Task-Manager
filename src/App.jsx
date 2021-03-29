import "./App.css";

import { useState, useEffect, useRef } from "react";

import Name from "./components/Name.jsx";
import Task from "./components/Task.jsx";
import Timer from "./components/Timer.jsx";

/* DB of Tasks */
let tasks = [];
let counter = 1;
let keyCounter = 0;
// let effect = false;

function App() {
  const start = useRef(0);

  const [taskState, setTaskState] = useState(""); /* adding task to a DOM */
  const [time, setTime] = useState(0); /* for change time on a page */
  const [btn, setBtn] = useState(false); /*  rendering a current button */

  /* Action on a start btn.  */
  let clickStartB = (e) => {
    setBtn((btn) => !btn);
    start.current = Date.now();
    console.log("start", start);
  };

  /* Action on a stop btn. Compute a period, update period into array and update time of current task   */
  let clickStopB = (e) => {
    setBtn((btn) => !btn);
    let end = Date.now();
    let period = end - start.current;

    tasks.forEach((item) => {
      if (item.status === "active") {
        item.period += period;
        return null;
      }
    });
  };

  /* Change status on 'active' if was click on a task. */
  let statusChanger = (e) => {
    setTime(timer);

    tasks.forEach((item) => {
      if (item.status === "active") {
        item.status = "";
        return null;
      }
    });

    tasks.forEach((item) => {
      if (item.id === e.target.id) {
        item.status = "active";
        console.log("statusChanger-task", tasks);
        return null;
      }
    });

    setTaskState(showTasks);
  };

  /* !Tasks rendering */

  let showTasks = () =>
    tasks.map((item) => {
      keyCounter++;

      if (item.status === "active") {
        return (
          <div
            key={keyCounter}
            className="task active"
            onClick={statusChanger}
            id={item.id}
          >
            <p>{item.title}</p>
          </div>
        );
      } else {
        return (
          <div key={keyCounter} className="task" onClick={statusChanger}>
            <p id={item.id}>{item.title}</p>
          </div>
        );
      }
    });

  /* Adding new tasks on a page at click on an add button. New task became automate active */
  let taskAdder = (e) => {
    e.preventDefault();
    
    let taskTitle = e.target[0].value;
    /* generate random number to create unique id  */
    let idNumm = Math.floor(Math.random() * Math.floor(10000));
    let id = taskTitle + idNumm;

    tasks.forEach((item) => {
      if (item.status === "active") {
        item.status = "";
        return null;
      }
    });

    let newTask = {
      title: taskTitle,
      id: id,
      status: "active",
      period: 0,
    };

    if (taskTitle.length === 0 || taskTitle === "add new task") {
      newTask.title = "NewTask-" + counter;
      counter += 1;
    }

    tasks.push(newTask);
    setTaskState(showTasks);
  };

  /* Show time  */
  let timer = () => {
    let currentTime = 0;

    tasks.forEach((item) => {
      if (item.status === "active") {
        currentTime = item.period;
        return null;
      }
    });

    return currentTime;
  };

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

  return (
    <div className="main">
      <Name />
      <br />
      <Timer
        time={time}
        btn={btn}
        clickStartB={clickStartB}
        clickStopB={clickStopB}
      />
      <Task taskAdder={taskAdder} taskState={taskState} />
    </div>
  );
}

export default App;
