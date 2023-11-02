import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Input from "../generic/Input.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import { formatTime, displayInputTime } from "../../utils/helpers.js";
import { faPlay, faPause, faRedo, faStepForward } from '@fortawesome/free-solid-svg-icons';


const Stopwatch = () => {
    //state to keep track of time
    const [time, setTime] = useState(0);
    //state to determine if timer is running
    const [isRunning, setIsRunning] = useState(false);
    //state to store user input in combined minutes and seconds as MM:SS format
    const [inputTime, setInputTime] = useState('02:30');
    //state to keep track of the target time in seconds
    const [targetTime, setTargetTime] = useState(150); //default 2m 30s

    //update targetTime when user inputTime changes
    useEffect(() => {
        //split inputTime into minutes and seconds, then calculate the new target time in seconds
        const [minutes, seconds] = inputTime.split(':').map(val => parseInt(val, 10));
        const newTargetTime = (minutes * 60 + seconds) || 0;
        setTargetTime(newTargetTime);
    }, [inputTime]);

    //handle stopwatch logic
    useEffect(() => {
        let interval;

        //if timer is running and hasn't reached target time, start stopwatch
        if (isRunning && time < targetTime) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1); //increase time by 1 every second
            }, 1000);
        } else if (time === targetTime) {
            //if time reaches target time, stop the timer
            setIsRunning(false);
        }

        //clear interval when component unmounts or when it's not running
        return () => clearInterval(interval);
    }, [isRunning, time, targetTime]);

    //function to handle input changes
    const handleInputChange = (e) => {
        setInputTime(e.target.value);
    };

    //function to start or pause the timer
    const startPauseTimer = () => {
        setIsRunning(isRunning => !isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
    };

    //function to end the timer
    const endTimer = () => {
        setTime(targetTime);
        setIsRunning(false);
    };

    //render timer and control buttons
    return (
        <div>
            <Panel>
                <Input label="Set Time" value={inputTime} onChange={handleInputChange} />
                <div className="explainer-text">
                    {displayInputTime(inputTime)}
                </div>
            </Panel>
            <DisplayTime>
                {formatTime(time)}
            </DisplayTime>
            <Panel className="control-panel">
                <div className="start-button-container">
                    <Button className="button-start" label={isRunning ? "Pause" : "Start"} icon={isRunning ? faPause : faPlay} onClick={startPauseTimer} />
                </div>
                <div className="buttons-container">
                    <Button className="button-reset" label="Reset" icon={faRedo} onClick={resetTimer} />
                    <Button className="button-end" label="End" icon={faStepForward} onClick={endTimer} />
                </div>
            </Panel>
        </div>
    );
};

export default Stopwatch;
