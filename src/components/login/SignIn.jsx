import './Login.css'
// import userLogo from '../assets/userLogo-2.png'

import {useState} from 'react';

export default function Login(props) {

       
    const [msg, setMsg] = useState('')
   

    /* Find a button over Event. The target is an id of button. We don't use a name or value because they can be changed f.e. translator  */
    let submitHandler = (e) => {
        e.preventDefault();
        let data = {};

        data.email = e.target[0].value;
        data.pass = e.target[1].value;

        //console.log(e.target);
        let url = "https://auth404.herokuapp.com/api/auth/login";
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, options).then(result => result.json().then(output => {
            let status = output.status;
            /* for send stats to App.js  */
            props.statusChecker(status);
            /* show a warning */
            if (status == 'failed') {
                /* This structure kinda reset a text for show aan animation */
                setMsg('')
                /* assign element instead just massage_, because wanna reveal text with animation  */
                setMsg(<h4 className="fadeIn color-yellow">{output.message}</h4>)
            }
        }));       
    }

    const [inputTypePasswd, setInputTypePasswd] = useState(['password', 'show', 'show-btn-show'])

    function showPass(e) {
        e.preventDefault();

        if (e.target.id === 'show-btn-show') {
            setInputTypePasswd(['text', 'hide', 'show-btn-hide']);

        } else if (e.target.id === 'show-btn-hide') {
            setInputTypePasswd(['password', 'show', 'show-btn-show']);
        }

    }

    return (
        <div className="wrapper fadeInDown">
            {/* <h4 className="fadeIn fourth">{msg}</h4> */}
            {msg}
            <div className="formContent">

                {/* Tabs Titles */}
                <h2 className="active"> Sign In </h2>
                <h2 onClick={props.toggle} className="inactive underlineHover">Sign Up </h2>
                {/* Icon */}
                {/* <div id='userLogo' className="fadeIn first">
                    <img className="userLogo" src={userLogo} id="icon" alt="User Icon" />
                </div> */}
                {/* Login Form */}
                <form className="login" onSubmit={submitHandler}>
                    {/*  type -= email screw up my outlook */}
                    {/* <input type="email" id="login" className="fadeIn second" name="login" placeholder="login" /> */}
                    <input type="email" id="login" className="fadeIn first" name="login" placeholder="login" />
                    <div className ="password">
                        <input type={inputTypePasswd[0]} id="password" className="short-psw fadeIn second" name="login" placeholder="password" />
                        <input type="button" id={inputTypePasswd[2]} className="fadeIn second" onClick={showPass} name="test" value={inputTypePasswd[1]} />
                    </div>
                    <input id="LogIn" type="submit" className="fadeIn third" defaultValue="Log In" />
                </form>
                {/* Remind Password */}
                <div className="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}