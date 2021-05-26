import "./Login.css";

import { useState, useContext } from "react";

import AuthChecker from "../../context/AuthChecker.jsx";

export default function SignUp(props) {
  const [msg, setMsg] = useState("");
  const authChecker = useContext(AuthChecker);

  /* Find a button over Event. The target is an id of button. We don't use a name or value because they can be changed f.e. translator  */
  let submitHandler = (e) => {
    e.preventDefault();
    console.log("submitHandler is running");

    let data = {};
    let firstName = e.target[0].value;
    let secondName = e.target[1].value;
    data.name = `${firstName} ${secondName}`;
    data.email = e.target[2].value;
    data.pass = e.target[3].value;

    let url = "https://auth404.herokuapp.com/api/auth/register";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, options).then((result) =>
      result.json().then((output) => {
        // console.log(output);
        let status = output.status;
        console.log(status);
        if (status === "failed") {
          setMsg("");
          /* assign element instead just massage_, because wanna reveal text with animation  */
          setMsg(
            <h4 className="fadeIn color-yellow">
              {"this email is already in use. Please try another"}
            </h4>
          );
        } else if (status === "success") {
          setMsg("");
          /* assign element instead just massage_, because wanna reveal text with animation  */
          setMsg(<h4 className="fadeIn color-white">{output.message}</h4>);
          /* Delay to show a customer a message  */
          setTimeout(() => authChecker.setStatus(true), 4000);
        }
      })
    );
  };

  const [inputTypePasswd, setInputTypePasswd] = useState([
    "password",
    "show",
    "show-btn-show",
  ]);

  function showPass(e) {
    e.preventDefault();

    if (e.target.id === "show-btn-show") {
      setInputTypePasswd(["text", "hide", "show-btn-hide"]);
    } else if (e.target.id === "show-btn-hide") {
      setInputTypePasswd(["password", "show", "show-btn-show"]);
    }
  }

  return (
    <div className="wrapper fadeInDown">
      {msg}
      <div className="formContent">
        {/* Tabs Titles */}
        <h2 onClick={props.toggle} className="inactive underlineHover">
          {" "}
          Sign In{" "}
        </h2>
        <h2 className="active">Sign Up </h2>
        {/* Login Form */}
        <form className="login" onSubmit={submitHandler}>
          <input
            type="text"
            id="first name "
            className="fadeIn second"
            name="login"
            placeholder="first name"
          />
          <input
            type="text"
            id="last name"
            className="fadeIn second"
            name="login"
            placeholder="last name"
          />
          <input
            type="email"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="login"
          />
          <div className="password">
            <input
              type={inputTypePasswd[0]}
              id="password"
              className="short-psw fadeIn third"
              name="login"
              placeholder="password"
            />
            <input
              type="button"
              id={inputTypePasswd[2]}
              className="fadeIn third"
              onClick={showPass}
              name="test"
              value={inputTypePasswd[1]}
            />
          </div>
          <input
            type="submit"
            className="fadeIn fourth"
            defaultValue="Sign Up"
          />
        </form>
        {/* <div className="formFooter">
        </div> */}
      </div>
    </div>
  );
}
