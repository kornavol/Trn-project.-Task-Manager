import './App.css';

import { useState, useEffect, useRef } from 'react';

import Name from './components/Name.jsx'
import Task from './components/Task.jsx'
import Timer from './components/Timer.jsx'


/* DB of Tasks */
let tasks = [];
let counter = 1;
let keyCounter = 0;
let eff = 0;
let log1 = [];
let log2 = [];
let appLog = []

// let effect = false;

function App() {
  const ref = useRef('stop')

  const [taskState, setTaskState] = useState('');   /* adding task to a DOM */
  const [time, setTime] = useState(0);              /* for change time on a page */
  const [stateBtn, setStateBtn] = useState(true);   /*  rendering a current button */
  
  
  /* Start\stop toggle */
  /* start time, declared outside of function because we need to keep a value */
  let start = 0;

  /* rendering Start\stop button  */
  function BtnShower(e) {
    setStateBtn(() => {
      // console.log(e.target.id);
      if (e.target.id === 'stopBtn') { 
        // console.log('stop');
        // alert(JSON.stringify(ref.current))
        return true
      } else if (e.target.id === 'srtBtn') {
        return false
       }
    })
  }

  /* Action on a start btn.  */
  let clickStartB = (e) => {
    // seteffect((prev) => !prev);
    ref.current = 'start';

    /* re-rendering time first to show start time point for another task */
    // setTime(timer)
    BtnShower(e)
    start = Date.now();
    // console.log('start', start);
  }

  /* Action on a stop btn. Compute a period, update period into array and update time of current task   */
  let clickStopB = (e) => {
    ref.current = 'stop';
    console.log(log1);
    console.log(log2);
    console.log(appLog);


    let end = Date.now();
    let period = end - start;

    tasks.forEach((item) => {
      if (item.status === 'active') {
        item.period += period;
        // setTime(timer);
        return null
      }
    })
    // BtnShower(e)
  }

  /* Change status on 'active' if was click on a task. */
  let statusChanger = (e => {
    setTime(timer);

    tasks.forEach(item => {
      if (item.status === 'active') {
        item.status = '';
        return null
      }
    });

    tasks.forEach(item => {
      if (item.id === e.target.id) {
        item.status = 'active';
        console.log('statusChanger-task', tasks);
        return null
      }
    });

    setTaskState(showTasks);
  });

  /* !Tasks rendering */

  let showTasks = () => tasks.map(item => {
    keyCounter++;

    if (item.status === 'active') {
      return (
        <div
          key={keyCounter}
          className='task active'
          onClick={statusChanger}
          id={item.id}
        >
          <p >{item.title}</p>
        </div>
      )
    } else {
      return (
        <div
          key={keyCounter}
          className='task'
          onClick={statusChanger}
        >
          <p id={item.id}>{item.title}</p>
        </div>
      )
    }
  })

  /* Adding new tasks on a page at click on an add button. New task became automate active */
  let taskAdder = e => {
    e.preventDefault();
    let taskTitle = e.target[0].value;
    /* generate random number to create unique id  */
    let idNumm = Math.floor(Math.random() * Math.floor(10000));
    let id = taskTitle + idNumm;

    tasks.forEach(item => {
      if (item.status === 'active') {
        item.status = ''
        return null
      }
    });

    let newTask = {
      title: taskTitle,
      id: id,
      status: 'active',
      period: 0
    }

    if (taskTitle.length === 0 || taskTitle === "add new task") {
      newTask.title = 'NewTask-' + counter;
      counter += 1;
    }

    tasks.push(newTask);
    setTaskState(showTasks);
  }


  

  /* Show time  */
  let timer = () => {
    let currentTime = 0;

    tasks.forEach((item) => {
      if (item.status === 'active') {
        currentTime = item.period;
        return null
      }
    })

    return currentTime;
  }



  useEffect(() => {
    console.log('useEffs', ref.current);
    log1.push(ref.current)
    if (ref.current === 'start') {
      console.log('into - useEffs', ref.current);
      log2.push(ref.current)
      eff++;
      setTimeout(() => {
        setTime((prev) => prev + 1000);
      }, 5000);
    }
  },)



  console.log('App');
  appLog.push(ref.current)
  // console.log('time', time);
  // console.log('effect', ref.current);
  // console.log('startpoint', start);


  return (
    <div className='main'>
      <Name />
      {ref.current}
      <br />
      {eff}
      <Timer
        time={time}
        stateBtn={stateBtn}
        clickStartB ={clickStartB}
        clickStopB = {clickStopB}
      />
      <Task
        taskAdder={taskAdder}
        taskState={taskState}
      />
    </div>

  );
}

export default App;
