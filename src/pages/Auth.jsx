import SignIn from "../components/login/SignIn.jsx";
import SignUp from "../components/login/SignUp.jsx";

import { useState } from "react";

export default function Authorization({ condition }) {
  let initBtn = condition;
  let element;

  if (initBtn === "SignIn") {
    element = (
      <SignIn
        toggle={toggle}
        // statusChecker = {props.statusChecker}
      />
    );
  } else if (initBtn === "SignUp")
    element = (
      <SignUp
        toggle={toggle}
        // statusChecker = {props.statusChecker}
      />
    );

  const [btn, setBtn] = useState(element);

  function toggle() {
    if (initBtn === "SignUp") {
      setBtn(
        <SignUp
          toggle={toggle}
          // statusChecker = {props.statusChecker}
        />
      );
      initBtn = "SignIn";
    } else if (initBtn === "SignIn") {
      setBtn(
        <SignIn
          toggle={toggle}
          // statusChecker = {props.statusChecker}
        />
      );
      initBtn = "SignUp";
    }
  }

  return btn;
}
