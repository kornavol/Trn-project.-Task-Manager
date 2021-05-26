/* 
Version where I tried to use setTaskState 
Issue #2: Incorrect rendering from taskAdder

*/

import "./App.css";

import { useState, useEffect, useRef } from "react";

import Name from "./components/Name.jsx";
import Task from "./components/Task.jsx";
import Timer from "./components/Timer.jsx";

function App() {
  const start = useRef(0);
  const counter = useRef(1);

  // ?
  const [tasks, setTasks] = useState([
    {
      title: "test",
      id: "id",
      status: "active",
      period: 0,
    },
  ]);

  const [taskState, setTaskState] = useState(""); /* adding task to a DOM */
  const [time, setTime] = useState(0); /* for change time on a page */
  const [btn, setBtn] = useState(false); /*  rendering a current button */

  /* Action on a start btn.  */
  let clickStartB = (e) => {
    setBtn((btn) => !btn);
    start.current = Date.now();
  };

  /* Action on a stop btn. Compute a period, update period into array and update time of current task   */
  let clickStopB = (e) => {
    setBtn((btn) => !btn);
    let end = Date.now();
    let period = end - start.current;

    /* It's a good approach */
    let newTasks = [...tasks];
    newTasks.forEach((item) => {
      if (item.status === "active") {
        item.period += period;
        return null;
      }
    });
    setTasks(newTasks);
    console.log(tasks);
  };

  /* Change status on 'active' if was click on a task. */
  let statusChanger = (e) => {
    
    let newTasks = [...tasks];
    newTasks.forEach((item) => {
      if (item.status === "active") {
        item.status = "";
        return null;
      }
    });

    
    newTasks.forEach((item) => {
      if (item.id === e.target.id) {
        item.status = "active";
        console.log("statusChanger-task", tasks);
        return null;
      }
    });
    setTasks(newTasks);
    
    setTaskState(showTasks);

    setTime(timer);
  };

  /* !Tasks rendering */

  let showTasks = () =>
    tasks.map((item) => {
      if (item.status === "active") {
        return (
          <div
            key={item.id}
            className="task active"
            onClick={statusChanger}
            id={item.id}
          >
            <p>{item.title}</p>
          </div>
        );
      } else {
        return (
          <div key={item.id} className="task" onClick={statusChanger}>
            <p id={item.id}>{item.title}</p>
          </div>
        );
      }
    });

  /* Adding new tasks on a page at click on an add button. New task became automate active */
  let taskAdder = (e) => {
    // NOT WOTKING WITH setTasks. Because setTaskState don't see update from setTasks
    
    e.preventDefault();

    

    let taskTitle = e.target[0].value;
    /* generate random number to create unique id  */
    let idNumm = Math.floor(Math.random() * Math.floor(10000));
    let id = taskTitle + idNumm;

    // let newTasks = [...tasks];
    
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
      newTask.title = "NewTask-" + counter.current;
      counter.current++;
    }

    tasks.push(newTask);
    // setTasks(newTasks);
    setTime(timer)
    setTaskState(showTasks);
  };

  /* Show time  */
  let timer = () => {
    let currentTime = 0;

    let newTasks = [...tasks];
    tasks.forEach((item) => {
      if (item.status === "active") {
        currentTime = item.period;
        return null;
      }
    });

    setTasks(newTasks);

    return currentTime;
  };

  useEffect(() => {
    let interval = null;
    if (btn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    }
    // else {
    //   clearInterval(interval);
    // }
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
