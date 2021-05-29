import { useState } from "react";

export default function Task(props) {
  const [isEditable, setisEditable] = useState(false);
  const editedTask = { _id: props.item._id };

  const editCardHandler = (e) => {
    const id = e.target.getAttribute("data-id");
    const info = e.target.innerText;
    /* console.log({id, info}); */
    editedTask[id] = info;
  };

  const editCheckHandler = (e) => {
    console.log(e);
    if (e.charCode == 13) {
      e.preventDefault();
    }
  };

  function deleteTask(e) {
    // console.log(e.target.offsetParent.id);

    const itemID = e.target.offsetParent.id;

    const url = "http://localhost:8080/tasks/delete/" + itemID;
    const options = {
      method: "DELETE",
    };

    fetch(url, options).then((res) =>
      res.json().then((output) => {
        // if (output.status === 'success') {
        //   props.statusChanger
        // } else {
        //   alert(output.message)
        // }

        if (output.status === "success") {
          props.deletefromDB(itemID);
        } else {
          console.log(output.messege);
        }
      })
    );
  }

  function EditTask() {
    setisEditable(!isEditable);
  }

  async function SaveTask() {
    const url = "http://localhost:8080/tasks/update";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    };
    setisEditable(!isEditable);

    await fetch(url, options).then((res) =>
      res.json().then((output) => console.log(output.message))
    );

    console.log(editedTask);
  }

  return (
    <div
      key={props.item._id}
      className={props.class}
      onClick={props.statusChanger}
      id={props.item._id}
    >
      <p
        data-id="title"
        contentEditable={isEditable}
        onKeyPress={editCheckHandler}
        onBlur={editCardHandler}
      >
        {props.item.title}
      </p>
      <div className="buttons">
        {isEditable ? (
          <button onClick={SaveTask}>💾</button>
        ) : (
          <button onClick={EditTask}>✏️</button>
        )}
        <button onClick={deleteTask}>🗑</button>
      </div>
    </div>
  );
}
