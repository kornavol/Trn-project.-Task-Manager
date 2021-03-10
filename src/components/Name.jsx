import { useState } from 'react';
import "./Name.css";

export default function Name() {

  let userNameHandler = (e) => {
    e.preventDefault();
    setState(
      <div id="name"> {e.target[0].value} </div>
    );

  }

  const [state, setState] = useState(
    <div className="name-form">

      <form onSubmit={userNameHandler}>
        <label className="blink_me">PLEASE FIRST TYPE YOUR NAME</label>
        <input id="name-input" type="text" />
        <input className="button form-button5" type="submit" value="Send" />
      </form>

    </div>


  );

  return state

}