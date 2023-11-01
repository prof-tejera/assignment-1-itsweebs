import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import { formatTime } from "../../utils/helpers.js";

const Stopwatch = () => {
    //state to keep track of time
    const [time, setTime] = useState(0);
    //state to determine if timer is running
    const [isRunning, setIsRunning] = useState(false);

    //handle countdown logic
    useEffect(() => {
        let interval;

        //if timer is running and time is less than 2m 30s, start stopwatch
        if (isRunning && time < 150) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1); //increase time by 1 every second
            }, 1000);
        } else if (time === 150) {
            //if time is 2m 30s, set state to false
            setIsRunning(false);
        }
        console.log (time, isRunning);

        //clear interval when component unmounts or when it's not running
        return () => clearInterval(interval);
    }, [isRunning, time]);

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
    const fastForwardTimer = () => {
        setTime(150);
        setIsRunning(false);
    };

    //render timer and control buttons
    return (
        <div>
            <DisplayTime>
                {formatTime(time)}
            </DisplayTime>
            <Panel>
                <Button label={isRunning ? "Pause" : "Start"} onClick={startPauseTimer} />
                <Button label="Reset" onClick={resetTimer} />
                <Button label="Fast Forward" onClick={fastForwardTimer} />
            </Panel>
        </div>
    );
};

export default Stopwatch;
