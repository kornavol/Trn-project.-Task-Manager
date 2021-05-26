import "./Tasks.css";

export default function Task(props) {
  return (
    <div className="tasks">
      <form className="task-form" onSubmit={props.taskAdder}>
        <input id="task-input" type="text" defaultValue="add new task" />
        <input className="add-button" type="submit" value="Add" />
      </form>
      {props.taskState}
      <br />
      <br />
    </div>
  );
}
