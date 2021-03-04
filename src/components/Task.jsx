import './Task.css';
import { useState } from 'react';


/* DB of Tasks */
let tasks = [
    {   
        /* needs as checker uniq tsk. title not suitable because can be a couple with the same name  */
        id: 1,
        title: 'testDate',
        /* for compute a period. Maybe "end time not necessary" */
        startTime: 1000,
        endTime: 5000,

        period: 0,
        /* "status" I'm planning to use as checker. If I click on task, it'll be changed */
        status: 'active'
    }
];

export default function Task() {

    const [state, setState] = useState('');

    /* for decelerate start and stop time */
    let start = null;
    let end = null;

    /*     let TimeCounter = () => {
            let period = end - start;
            task[i].period = period;
    
        } */
    
    let clickBB = () => {
        /* checker what task is active and start count time */
        tasks.find((item) => {
            if (item.status == 'active') {
                /* REPLACE */
                item.title = 'status active';
                setState(showTasks)
            }
        })


                /* start = new Date;
                end = new Date; */
    }



    /* Previous version  of click function. Keep because of pass to dom element  */
    let click = (e) => {

        let target = e.target.parentElement.children[0].textContent;
   
        tasks.find((item) => {
            if (item.title === target) {
                item.title = "another name";

            }
            setState(showTasks)

        } )



    }


    /* !Tasks rendering */
    let showTasks = () => tasks.map(item => {

        return (
            <div className='task'>
                <p>{item.title}</p>
            </div>
        )
    })

    /* Adding new tasks on a page */
    let Adder = e => {
        e.preventDefault();
        let taskTitle = e.target[0].value;
        let newTask = { title: taskTitle }
        tasks.push(newTask);
        setState(showTasks);

        console.log(tasks);
    }

    return (
        <div>
            <button onClick = {clickBB}>Start</button>
            <button onClick = {clickBB}>Stop</button>

            <form onSubmit={Adder} >
                <p>Test</p>
                <input type="text" />
                <input type="submit" value="Add" />
            </form>
            {state}
        </div>
    )


}