import './Task.css';


export default function Task(props) {
   

    return (
        <div className="tasks">
            <p>time to work</p>
            <form className="task-form" onSubmit={props.taskAdder}>
                {/* <label>New Task</label> */}
                <input id="task-input" type="text" defaultValue="add new task"/>
                <input className="add-button" type="submit" value="Add" />
            </form>
            {props.taskState}
            <br/>
            <br/>
        </div>
    )

}