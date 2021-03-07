import './Task.css';
import { useState } from 'react';


/* DB of Tasks */
let tasks = [];

export default function Task() {
    /* adding task to a  DOM */
    const [state, setState] = useState('');

    /* start time, declared outside of function because we need to keep a value */
    let start = 0;

    /* Action on a start btn.  */
    let clickStartB = () => {
        /* rerendering time first to show start time to another task */
        setTime(timer)

        start = Date.now();
        console.log('start', start);
    }

    /* Action on a stop btn. Compute a period, update period into array and update time of current task   */
    let clickStopB = () => {
        let end = Date.now();
        console.log('end', end);

        let period = end - start;
        console.log('period', period);

        tasks.find((item) => {
            if (item.status == 'active') {
                item.period += period;

                setTime(timer);
            }
        })

        console.log('afterstop', tasks);

    }

    /* Change status on 'active' if was click on a task. */
    let statusChanger = (e => {
        setTime(timer);

        console.log(e.target.id);

        tasks.find(item => {
            if (item.status == 'active') {
                item.status = '';
            }
        });

        tasks.find(item => {
            if (item.id == e.target.id) {
                item.status = 'active';
            }
        });
        setState(showTasks);
        // setTime(timer);
    });



    /* !Tasks rendering */

    let showTasks = () => tasks.map(item => {

        if (item.status == 'active') {
            return (
                <div
                    id={item.id}
                    className='task active'
                    onClick={statusChanger}
                >
                    <p>{item.title}</p>
                </div>
            )
        } else {
            return (
                <div
                    id={item.id}
                    className='task'
                    onClick={statusChanger}
                >
                    <p>{item.title}</p>
                </div>
            )
        }
    })

    /* Adding new tasks on a page at click on an add button. New task became automate active */
    let taskAdder = e => {
        e.preventDefault();
        let taskTitle = e.target[0].value;
        /* generae random number to create unique id  */
        let idNumm = Math.floor(Math.random() * Math.floor(100));
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

        tasks.push(newTask);
        setState(showTasks);
    }


    /* for change time on a page */
    const [time, setTime] = useState('0d 0h 0m 0s');

    /* Show time  */
    let timer = () => {
        let currentTime = 0;

        tasks.find((item) => {
            if (item.status == 'active') {
                currentTime = item.period;
                console.log('currentTime', currentTime);
            }
        })
        /* change ms to normal outlook */
        let days = Math.floor(currentTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((currentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

        let normTime = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        console.log('period', currentTime)
        console.log('normtme', normTime)

        if (currentTime > 0) {
            return normTime;
        } else {
            return '0d 0h 0m 0s';
        }
    }



    return (
        <div>
            <button onClick={clickStartB}>Start</button>
            <button onClick={clickStopB}>Stop</button>
            <br />
            <p>{time}</p>
            <br />
            <form onSubmit={taskAdder} >
                <p>Test</p>
                <input type="text" />
                <input type="submit" value="Add" />
            </form>
            <br />
            {state}
        </div>
    )

}