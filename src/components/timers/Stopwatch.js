import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Input from "../generic/Input.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import { formatTime } from "../../utils/helpers.js";

const Stopwatch = () => {
    //state to keep track of time
    const [time, setTime] = useState(0);
    //state to determine if timer is running
    const [isRunning, setIsRunning] = useState(false);
    //state to store user input for minutes
    const [inputMinutes, setInputMinutes] = useState('2');
    //state to store user input for seconds
    const [inputSeconds, setInputSeconds] = useState('30');
    //state to keep track of the target time in seconds
    const [targetTime, setTargetTime] = useState(150); //default 2m 30s

    //update targetTime when user inputs change
    useEffect(() => {
        const newTargetTime = parseInt(inputMinutes, 10) * 60 + parseInt(inputSeconds, 10) || 0;
        setTargetTime(newTargetTime);
    }, [inputMinutes, inputSeconds]);

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
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
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
                <Input label="Set Minutes" value={inputMinutes} onChange={handleInputChange(setInputMinutes)} />
                <Input label="Set Seconds" value={inputSeconds} onChange={handleInputChange(setInputSeconds)} />
            </Panel>
            <DisplayTime>
                {formatTime(time)}
            </DisplayTime>
            <Panel>
                <Button label={isRunning ? "Pause" : "Start"} onClick={startPauseTimer} />
                <Button label="Reset" onClick={resetTimer} />
                <Button label="End" onClick={endTimer} />
            </Panel>
        </div>
    );
};

export default Stopwatch;
