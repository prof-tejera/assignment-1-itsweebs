import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Input from "../generic/Input.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import DisplayRounds from "../generic/DisplayRounds.js";
import { formatTime } from "../../utils/helpers.js";

const XY = () => {
    //define default values
    const defaultMinutes = 1;
    const defaultRounds = 10;

    //state to keep track of time in seconds
    const [time, setTime] = useState(defaultMinutes * 60);
    //state to keep track of user input in minutes
    const [minutes, setMinutes] = useState(defaultMinutes.toString());
    //state to keep track of the total number of rounds
    const [rounds, setRounds] = useState(defaultRounds.toString());
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
                setTime(time => time - 1);
            }, 1000);
        }
        //if time runs out and there are more rounds to go, move to the next round, stop timer when all rounds are complete
        else if (isRunning && time === 0) {
            const nextRound = currentRound + 1;
            const totalRounds = parseInt(rounds, 10) || defaultRounds;
            if (nextRound <= totalRounds) {
                setCurrentRound(nextRound);
                setTime((parseInt(minutes, 10) || defaultMinutes) * 60);
            } else {
                setIsRunning(false);
            }
        }

        //clear the interval when the component unmounts or timer stops
        return () => clearInterval(interval);
    }, [isRunning, time, currentRound, rounds, minutes, defaultMinutes, defaultRounds]);

    //function to start or pause the timer
    const startPauseTimer = () => {
        if (!isRunning && time === 0 && currentRound === (parseInt(rounds, 10) || defaultRounds)) {
            setTime((parseInt(minutes, 10) || defaultMinutes) * 60);
            setCurrentRound(1);
        }
        setIsRunning(!isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime((parseInt(minutes, 10) || defaultMinutes) * 60);
        setCurrentRound(1);
    };

    //function to forward to end of round
    const fastForwardTimer = () => {
        if (currentRound < (parseInt(rounds, 10) || defaultRounds)) {
            setTime(0);
        } else {
            setIsRunning(false);
        }
    };

    //function to end the timer
    const endTimer = () => {
        setTime(0);
        setCurrentRound(parseInt(rounds, 10) || defaultRounds);
        setIsRunning(false);
    };

    //handle changes in X input (minutes)
    const handleMinutesChange = (e) => {
        const value = e.target.value;
        setMinutes(value);
        if (value === '') {
            setTime(0);
        } else {
            setTime(parseInt(value, 10) * 60);
        }
    };

    //handle changes in Y input (rounds)
    const handleRoundsChange = (e) => {
        const value = e.target.value;
        setRounds(value);
        if (value === '') {
            setCurrentRound(1);
        }
    };

    //render timer and control buttons
    return (
        <div>
            <Panel>
                <Input label="Set minutes" value={minutes} onChange={handleMinutesChange} />
                <Input label="Set rounds" value={rounds} onChange={handleRoundsChange} />
            </Panel>
            <DisplayTime>
                {formatTime(time)}
            </DisplayTime>
            <DisplayRounds text={`Round ${currentRound} of ${parseInt(rounds, 10) || defaultRounds}`} />
            <Panel>
                <Button label={isRunning ? 'Pause' : 'Start'} onClick={startPauseTimer} />
                <Button label="Reset" onClick={resetTimer} />
                <Button label="Fast Forward" onClick={fastForwardTimer} />
                <Button label="End" onClick={endTimer} />
            </Panel>
        </div>
    );
};

export default XY;
