import './App.css';

import { useState } from 'react';

import Name from './components/Name.jsx'
import Task from './components/Task.jsx'
import Timer from './components/Timer.jsx'


/* DB of Tasks */
let tasks = [];
let counter = 1;

function App() {

  /* adding task to a  DOM */
  const [taskState, setTaskState] = useState('');

  /* start time, declared outside of function because we need to keep a value */
  let start = 0;

  /* rendering Start\stop button  */
  function BtnShower(e) {
    setstateBtn(() => {
      // console.log(e.target.id);
      if (e.target.id == 'stopBtn') {
        return (
          <button id="srtBtn" className="button form-button5 time-button" onClick={clickStartB}>Start</button>
        )
      } else if (e.target.id == 'srtBtn') {
        return (
          <button id="stopBtn" className="button form-button5 time-button" onClick={clickStopB}>Stop</button>
        )
      }
    })
  }

  /* Action on a start btn.  */
  let clickStartB = (e) => {
    /* rerendering time first to show start time to another task */
    setTime(timer)
    BtnShower(e)
    start = Date.now();
    // console.log('start', start);
  }

  /* Action on a stop btn. Compute a period, update period into array and update time of current task   */
  let clickStopB = (e) => {
    let end = Date.now();
    let period = end - start;

    tasks.find((item) => {
      if (item.status == 'active') {
        item.period += period;

        setTime(timer);
      }
    })
    BtnShower(e)
  }

  /* Change status on 'active' if was click on a task. */
  let statusChanger = (e => {
    setTime(timer);

    tasks.find(item => {
      if (item.status == 'active') {
        item.status = '';
      }
    });

    tasks.find(item => {
      if (item.id == e.target.id) {
        item.status = 'active';
        console.log('statusChanger-task', tasks);
      }
    });

    setTaskState(showTasks);
  });

  /* !Tasks rendering */

  let showTasks = () => tasks.map(item => {

    if (item.status == 'active') {
      return (
        <div
          className='task active'
          onClick={statusChanger}
        >
          <p id={item.id}>{item.title}</p>
        </div>
      )
    } else {
      return (
        <div
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

    tasks.find(item => {
      if (item.status == 'active') {
        item.status = ''
      }
    });

    let newTask = {
      title: taskTitle,
      id: id,
      status: 'active',
      period: 0
    }

    if (typeof (taskTitle) === 'string' && taskTitle.length == 0) {
      newTask.title = 'NewTask-' + counter;
      counter += 1;
    }

    tasks.push(newTask);
    setTaskState(showTasks);
  }


  /* for change time on a page */
  const [time, setTime] = useState('0d 0h 0m 0s');

  /* Show time  */
  let timer = () => {
    let currentTime = 0;

    tasks.find((item) => {
      if (item.status == 'active') {
        currentTime = item.period;
      }
    })
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

  /* Start\stop toggle */
  const [stateBtn, setstateBtn] = useState(() => {
    return (
      <button id="srtBtn" className="button form-button5 time-button" onClick={clickStartB}>Start</button>

    )
  })


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
