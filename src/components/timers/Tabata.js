import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import Input from "../generic/Input.js";
import DisplayRounds from "../generic/DisplayRounds.js";
import { formatTime } from "../../utils/helpers.js";

const Tabata = () => {
    //state to keep track of work time
    const [workTime, setWorkTime] = useState(20);
    //state to keep track of rest time
    const [restTime, setRestTime] = useState(10);
    //state to keep track of the total number of rounds
    const [rounds, setRounds] = useState(8);
    //state to keep track of the current round
    const [currentRound, setCurrentRound] = useState(1);
    //state to determine if the timer is running
    const [isRunning, setIsRunning] = useState(false);
    //state to track whether it is work or rest time
    const [isWorkTime, setIsWorkTime] = useState(true);
    //state to keep track of the remaining time in the current interval
    const [remainingTime, setRemainingTime] = useState(workTime);

    //handle timer logic
    useEffect(() => {
        let interval;

        //if the timer is running and there's still time left, decrease time by 1 every second
        if (isRunning && remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        }
        //if the timer is running but time ran out and there are more rounds to go, switch between work and rest times
        else if (isRunning && remainingTime === 0 && currentRound < rounds) {
            if (isWorkTime) {
                setIsWorkTime(false);
                setRemainingTime(restTime);
            } else {
                setIsWorkTime(true);
                setCurrentRound((prevRound) => prevRound + 1);
                setRemainingTime(workTime);
            }
        }
        //if the timer is running, time ran out, and all rounds are done, stop the timer
        else if (isRunning && remainingTime === 0 && currentRound === rounds) {
            clearInterval(interval);
            setIsRunning(false);
        }

        //clear the timer when the component unmounts or values change
        return () => clearInterval(interval);
    }, [isRunning, remainingTime, currentRound, rounds, workTime, restTime, isWorkTime]);


    //function to start or pause the timer
    const startPauseTimer = () => {
        setIsRunning(isRunning => !isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setRemainingTime(workTime);
        setCurrentRound(1);
        setIsWorkTime(true);
    };

    //function to fast forward to the end of the current interval
    const fastForwardTimer = () => {
        setRemainingTime(0);
        if (isWorkTime && currentRound === rounds) {
            setIsRunning(false);
        }
    };

    //handle changes in work time input
    const handleWorkTimeChange = (e) => {
        const newValue = Math.max(1, parseInt(e.target.value, 10));
        if (!isNaN(newValue)) {
            setWorkTime(newValue);
            if (isWorkTime) {
                setRemainingTime(newValue);
            }
        }
    };

    //handle changes in rest time input
    const handleRestTimeChange = (e) => {
        const newValue = Math.max(1, parseInt(e.target.value, 10));
        if (!isNaN(newValue)) {
            setRestTime(newValue);
            if (!isWorkTime) {
                setRemainingTime(newValue);
            }
        }
    };

    //handle changes in rounds input
    const handleRoundsChange = (e) => {
        const newValue = Math.max(1, parseInt(e.target.value, 10));
        if (!isNaN(newValue)) {
            setRounds(newValue);
        }
    };

    // Render timer and control buttons
    return (
        <div>
            <Panel>
                <Input label="Set Work Time (s)" value={workTime} onChange={handleWorkTimeChange} />
                <Input label="Set Rest Time (s)" value={restTime} onChange={handleRestTimeChange} />
                <Input label="Set Rounds" value={rounds} onChange={handleRoundsChange} />
            </Panel>
            <DisplayTime>
                {formatTime(remainingTime)}
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

export default Tabata;
