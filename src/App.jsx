import {useState} from 'react';
import './App.css';
import Task from './components/Task.jsx'

function App() {

  let userNameHandler = (e) => { 
    e.preventDefault();
    setState(e.target[0].value);

  }

  const [state, setState] = useState( () => {
    return (
      <div className="App">
        
          <form onSubmit = {userNameHandler}>
            <p>Please type you name</p>
            <input/>
            {/* <button onChange = {userNameHandler}>Add</button> */}
            {/* <input onChange = {userNameHandler} /> */}
            <input type="submit" value="Send" />
          </form>
        
      </div>
    );

  });



  return (
    <div className = 'main'>
      {state}
      <Task/>
     </div>
    
  );
}

export default App;
