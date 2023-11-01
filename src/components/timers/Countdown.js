import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";

const Countdown = () => {
    //state to keep track of time
    const [time, setTime] = useState(150); // 2m 30s
    //state to determine if timer is running
    const [isRunning, setIsRunning] = useState(false);

    //handle countdown logic
    useEffect(() => {
        let interval;

        //if timer is running and time is greater than 0, start countdown
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1); //decrease time by 1 every second
            }, 1000);
        } else if (!isRunning || time === 0) {
            // If timer is not running or time is 0, clear interval
            clearInterval(interval);
        }

        //clear interval when component unmounts or when it's running
        return () => clearInterval(interval);
    }, [isRunning, time]);

    //format time in minutes and seconds
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    //function to start or pause the timer
    const startPauseTimer = () => {
        setIsRunning(!isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime(150);
    };

    //function to end the timer
    const fastForwardTimer = () => {
        setTime(0);
        setIsRunning(false);
    };

    //render timer and control buttons
    return (
        <div>
            <DisplayTime>
                <span>{formatTime(time)}</span>
            </DisplayTime>
            <Panel>
                <Button label={isRunning ? 'Pause' : 'Start'} onClick={startPauseTimer} />
                <Button label="Reset" onClick={resetTimer} />
                <Button label="Fast Forward" onClick={fastForwardTimer} />
            </Panel>
        </div>
    );
};

export default Countdown;
