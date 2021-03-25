import './App.css';

import { useState, useEffect } from 'react';

import Name from './components/Name.jsx'
import Task from './components/Task.jsx'
import Timer from './components/Timer.jsx'


/* DB of Tasks */
let tasks = [];
let counter = 1;
let keyCounter = 0;
let currentTime = 0;
let effStsCheck = false;


function App() { 
  
  /* adding task to a  DOM */
  const [taskState, setTaskState] = useState('');
  /* Start\stop toggle */


  /* start time, declared outside of function because we need to keep a value */
  let start = 0;

  /* rendering Start\stop button  */
  function BtnShower(e) {
    setstateBtn(() => {
      // console.log(e.target.id);
      if (e.target.id === 'stopBtn') {
        return (
          <button id="srtBtn" className="button form-button5 time-button" onClick={clickStartB}>Start</button>
        )
      } else if (e.target.id === 'srtBtn') {
        return (
          <button id="stopBtn" className="button form-button5 time-button" onClick={clickStopB}>Stop</button>
        )
      }
    })
  }

  /* Action on a start btn.  */
  let clickStartB = (e) => {
    currentTime = 0;
    /* rerendering time first to show start time to another task */
    setTime(() => timer(0))
    effStsCheck = true;
    BtnShower(e)
    start = Date.now();
    // console.log('start', start);
  }

  /* Action on a stop btn. Compute a period, update period into array and update time of current task   */
  let clickStopB = (e) => {
    console.log('stop');
    currentTime = 0;
    effStsCheck = false;
    BtnShower(e)
    
    let end = Date.now();
    let period = end - start;

    tasks.forEach((item) => {
      if (item.status === 'active') {
        item.period += period;
        let fixer = -period - 1000;
        setTime(() => timer(fixer));
        return null
      }
    })
    
  }


  const [stateBtn, setstateBtn] = useState(
    <button id="srtBtn" className="button form-button5 time-button" onClick={clickStartB}>Start</button>
  )

  /* Change status on 'active' if was click on a task. */
  let statusChanger = (e => {
    setTime(() => timer(0));

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
    console.log(tasks);
    setTaskState(showTasks);
  }


  /* for change time on a page */
  const [time, setTime] = useState('0d 0h 0m 0s ');

  /* Show time  */
  let timer = (interval) => {
    

    tasks.forEach((item) => {
      if (item.status === 'active') {
        let testcurrentTime = item.period + interval;
        console.log('period', item.period);
        currentTime += testcurrentTime;
        return null
      }
    })
    console.log('currentTime', currentTime);
    // console.log('interval', interval);

    /* change ms to normal outlook */
    let days = Math.floor(currentTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((currentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

    let normTime = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

    if (currentTime > 0) {
      return normTime;
    } else {
      return '0d 0h 0m 0s';
    }
  }

  useEffect(() => {
    if (effStsCheck) {
      setTimeout(() => {
        setTime(() => timer(1000))
  
      }, 1000);
      console.log('useEffect');   
    }
  }, [time]);


  console.log('App was');




  return (
    <div className='main'>
      <Name />
      <Timer
        time={time}
        stateBtn={stateBtn}
      />
      <Task
        taskAdder={taskAdder}
        taskState={taskState}
      />
    </div>

  );
}

export default App;
