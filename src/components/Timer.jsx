import './Time.css';

export default function Timer(props) {

    let timer = props.time;

    /* change ms to normal outlook */
    let days = Math.floor(timer / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timer % (1000 * 60)) / 1000);

    let normTime = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    if (timer == 0) {
        normTime = '0d 0h 0m 0s'
    }


    return (
        <div>
            <div className="timer">
                <div className="time">{normTime}</div>

                <div>
                {props.btn ? <button id="stopBtn" className="button form-button5 time-button" onClick={props.clickStopB}>Stop</button> : <button id="srtBtn" className="button form-button5 time-button" onClick={props.clickStartB}>Start</button>}    
                </div> 
            </div>
        </div>
    )

}