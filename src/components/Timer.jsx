import './Time.css';

export default function Timer(props) {

    return (
        <div>
            <div className = "timer">
                <div className ="time">{props.time}</div>
            
                <div id="time-buttons">
                    {props.stateBtn}
                    
                </div>
            </div>
        </div>
    )

}