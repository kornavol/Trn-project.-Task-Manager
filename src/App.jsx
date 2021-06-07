import "./App.css";

import { useState, useEffect, useRef, useContext } from "react";

import AuthChecker from "./context/AuthChecker.jsx";

// import Name from "./components/Name.jsx";
import Timer from "./components/Timer/Timer.jsx";
import AuthIcons from "./components/AuthIcons.jsx";
import Auth from "./pages/Auth.jsx";
import Tasks from "./components/Tasks/Tasks.jsx";
import Task from "./components/Tasks/Task.jsx";

function App() {
  const start = useRef(0); /* to keep a start time independently from a render*/
  const counter =
    useRef(
      1
    ); /* to increase counter independently from a render. Using for tasks Id nd key*/

  const routing = useContext(AuthChecker);

  const [tasks, setTasks] = useState([]); /* DB */
  const [time, setTime] = useState(0); /* for change time on a page */
  const [btn, setBtn] = useState(false); /*  rendering a current button */
  const [auth, setAuth] =
    useState(); /*  rendering an auth.form with current state */

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
  let statusChanger = (e,t) => {
    console.log('isEditable from App:  ', routing.isEditable);

    if (!routing.isEditable || t) {
      console.log('isEditable from IF:  ', routing.isEditable);

      let newTasks = [...tasks];
      newTasks.forEach((item) => {
        if (item.status === "active") {
          item.status = "";
          return null;
        }
      });

      newTasks.forEach((item) => {
        if (item._id === e.target.id || item._id === e.target.parentNode.id) {
          item.status = "active";
          return null;
        }
      });

      setTasks(newTasks);
      setTime(timer);
    }
  };

  const deleteTask = (id) => {
    /* Doesn't have sense to do it. Because App.jsx will be remount and we get all information from back. But keeping it because it's a proper way */
    const newTasks = tasks.filter((task) => {
      if (task._id !== id) {
        return task;
      }
    });
    console.log("New Task", newTasks);
    setTasks(newTasks);
  };

  /* Tasks rendering. Executing by each App rendering  */
  const showTasks = tasks.map((item) => {
    if (item.status === "active") {
      return (
        <Task
          key={item._id}
          class={"task active"}
          item={item}
          deletefromDB={deleteTask}
          statusChanger={statusChanger}
        />

        // <div
        //   key={item._id}
        //   className="task active"
        //   onClick={statusChanger}
        //   id={item._id}
        // >
        //   <p>{item.title}</p>
        // </div>
      );
    } else {
      return (
        <Task
          key={item._id}
          class={"task"}
          item={item}
          deletefromDB={deleteTask}
          statusChanger={statusChanger}
        />
        // <div key={item._id} className="task" onClick={statusChanger}>
        //   <p id={item._id}>{item.title}</p>
        // </div>
      );
    }
  });

  /* Adding new tasks on a page at click on an add button. New task became automate active */
  let taskAdder = (e) => {
    e.preventDefault();

    let taskTitle = e.target[0].value;
    // let id = taskTitle + counter.current;

    let newTasks = [...tasks];

    newTasks.forEach((item) => {
      if (item.status === "active") {
        item.status = "";
        return null;
      }
    });

    let newTask = {
      title: taskTitle,
      // id: id,
      status: "",
      period: 0,
    };

    if (taskTitle.length === 0 || taskTitle === "add new task") {
      newTask.title = "NewTask-" + counter.current;
      counter.current++;
    }

    /* Back-end part */

    const url = "http://localhost:8080/tasks/new";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    };

    fetch(url, options).then((data) =>
      data.json().then((output) => {
        newTask._id = output._id;
      })
    );

    newTask.status = "active"; // so far fo back-end
    newTasks.push(newTask);

    setTasks(newTasks);
    setTime(timer);
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

  /*  Timer updating  */
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

  useEffect(() => {
    const url = "http://localhost:8080/tasks/all";
    const options = {
      // headers: {
      //     'x-auth-tocken': localStorage.getItem('token')
      // }
    };

    fetch(url).then((data) =>
      data.json().then((tasks) => {
        setTasks(tasks);
      })
    );
  }, []);

  /* Checking wish button was clicked in order to return <Auth> in correct state   */
  function authChecker(e) {
    if (e.target.id === "sign-in") {
      setAuth(<Auth condition={"SignIn"} />);
    } else if (e.target.id === "sign-up") {
      setAuth(<Auth condition={"SignUp"} />);
    }
  }

  console.log("App was updated");

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
          <Tasks taskAdder={taskAdder} taskState={showTasks} />
        </div>
      ) : (
        auth
      )}
    </div>
  );
}

export default App;
