import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import { formatTime } from "../../utils/helpers.js";

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
        } else if (time === 0) {
            //if time is 0, stop the timer
            setIsRunning(false);
        }
        console.log (time, isRunning);

        //clear interval when component unmounts or when it's running
        return () => clearInterval(interval);
    }, [isRunning, time]);


    //function to start or pause the timer
    const startPauseTimer = () => {
        setIsRunning(isRunning => !isRunning);
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
                {formatTime(time)}
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
