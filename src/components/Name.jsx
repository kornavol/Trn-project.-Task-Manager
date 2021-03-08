import {useState} from 'react';
import "./Name.css";

export default function Name() {
    
    let userNameHandler = (e) => { 
        e.preventDefault();
        setState( () => {

            return <div id="name">  {e.target[0].value} </div>
        });
    
      }
    
      const [state, setState] = useState( () => {
        return (
          <div className="name-form">
            
              <form onSubmit = {userNameHandler}>
                <label for="fname">PLEASE TYPE YOUR NAME</label>
                <input id="name-input"type="text" />
                <input className = "button form-button5" type="submit" value="Send" />
              </form>
            
          </div>
        );
    
    });
    
    return state
    
}