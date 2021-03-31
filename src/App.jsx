/* 
Version where I tried to use setTaskState 
Issue #1: setTime from setTaskState don't work properly
*/

import "./App.css";

import { useState, useEffect, useRef, useContext } from "react";

import AuthChecker from "./context/AuthChecker.jsx";

// import Name from "./components/Name.jsx";
import Task from "./components/Tasks/Tasks.jsx";
import Timer from "./components/Timer/Timer.jsx";
import AuthIcons from "./components/AuthIcons.jsx";
import Auth from "./pages/Auth.jsx";

function App() {
  const start = useRef(0);                          /* to keep a start time independently from a render*/
  const counter = useRef(1);                        /* to increase counter independently from a render. Using for tasks Id nd key*/

  const routing = useContext(AuthChecker);          

  const [tasks, setTasks] = useState([]);
  const [taskState, setTaskState] = useState("");   /* adding task to a DOM */
  const [time, setTime] = useState(0);              /* for change time on a page */
  const [btn, setBtn] = useState(false);            /*  rendering a current button */
  const [auth,setAuth,] = useState();               /*  rendering an auth.form with current state */

  /* render new task in changing in DB (tasks) */
  useEffect(() => {
    setTaskState(showTasks);
  }, [tasks]);

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
    e.preventDefault();

    let taskTitle = e.target[0].value;
    let id = taskTitle + counter.current;

    let newTasks = [...tasks];

    newTasks.forEach((item) => {
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

    newTasks.push(newTask);
    setTasks(newTasks);

    setTime(timer);
  };
  console.log(tasks, taskState);

  /* Show time  */
  let timer = () => {
    let currentTime = 0;
    // if (tasks.length>0) {
    let newTasks = [...tasks];
    newTasks.forEach((item) => {
      if (item.status === "active") {
        currentTime = item.period;
        return null;
      }
    });

    // setTasks(newTasks);
    // }
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

  function authChecker(e) {
    if (e.target.id === "sign-in") {
      setAuth(<Auth condition={"SignIn"} />);
    } else if (e.target.id === "sign-up") {
      setAuth(<Auth condition={"SignUp"} />);
    }
  }

  console.log("app was updated");

  return (
    <div>
      {routing.status ? (
        <div className="main">
          <AuthIcons
            toggle={() => routing.setStatus(false)}
            authChecker={authChecker}
          />
          <br />
          <Timer
            time={time}
            btn={btn}
            clickStartB={clickStartB}
            clickStopB={clickStopB}
          />
          <Task taskAdder={taskAdder} taskState={taskState} />
        </div>
      ) : (
        auth
      )}
    </div>
  );
}

export default App;
