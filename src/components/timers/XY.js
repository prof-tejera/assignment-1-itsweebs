import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import Input from "../generic/Input.js";
import DisplayRounds from "../generic/DisplayRounds.js";
import { formatTime } from "../../utils/helpers.js";

const XY = () => {
    //state to keep track of time in seconds
    const [time, setTime] = useState(60);
    //state to keep track of the total number of rounds
    const [rounds, setRounds] = useState(10);
    //state to keep track of the current round
    const [currentRound, setCurrentRound] = useState(1);
    //state to determine if the timer is running
    const [isRunning, setIsRunning] = useState(false);

    //handle timer logic
    useEffect(() => {
        let interval;

        //if the timer is running and there is time left, decrease the time by 1 every second
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }
        //if time runs out and there are more rounds to go, move to the next round
        else if (isRunning && time === 0 && currentRound < rounds) {
            setCurrentRound((prevRound) => prevRound + 1);
            setTime(60); //reset time
        }
        //if the time runs out and all rounds are completed, set state to false
        else if (time === 0 && currentRound === rounds) {
            setIsRunning(false);
        }

        //clear the interval when the component unmounts or timer stops
        return () => clearInterval(interval);
    }, [isRunning, time, currentRound, rounds]); 

    //function to start or pause the timer
    const startPauseTimer = () => {
        setIsRunning(isRunning => !isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime(60);
        setCurrentRound(1);
    };

    //function to forward to end of round
    const fastForwardTimer = () => {
        setTime(0);
        setCurrentRound(rounds);
        setIsRunning(false);
    };

    //handle changes in X input (minutes)
    const handleXChange = (e) => {
        const newValue = Math.max(0, parseInt(e.target.value, 10));
        if (!isNaN(newValue)) {
            setTime(newValue * 60); //convert minutes to seconds
        }
    };

    //handle changes in Y input (rounds)
    const handleYChange = (e) => {
        const newValue = Math.max(1, parseInt(e.target.value, 10));
        if (!isNaN(newValue)) {
            setRounds(newValue);
        }
    };

    //render timer and control buttons
    return (
        <div>
            <Panel>
                <Input label="Set minutes" value={time / 60} onChange={handleXChange} />
                <Input label="Set rounds" value={rounds} onChange={handleYChange} />
            </Panel>
            <DisplayTime>
                {formatTime(time)}
            </DisplayTime>
            <DisplayRounds currentRound={currentRound} totalRounds={rounds} />
            <Panel>
                <Button label={isRunning ? 'Pause' : 'Start'} onClick={startPauseTimer} />
                <Button label="Reset" onClick={resetTimer} />
                <Button label="Fast Forward" onClick={fastForwardTimer} />
            </Panel>
        </div>
    );
};

export default XY;
