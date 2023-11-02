import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Input from "../generic/Input.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import DisplayRounds from "../generic/DisplayRounds.js";
import { formatTime } from "../../utils/helpers.js";

const Tabata = () => {
    //define default values
    const defaultWorkTime = 20;
    const defaultRestTime = 10;
    const defaultRounds = 8;

    //state to keep track of work time
    const [workTime, setWorkTime] = useState(defaultWorkTime.toString());
    //state to keep track of rest time
    const [restTime, setRestTime] = useState(defaultRestTime.toString());
    //state to keep track of the total number of rounds
    const [rounds, setRounds] = useState(defaultRounds.toString());
    //state to keep track of the current round
    const [currentRound, setCurrentRound] = useState(1);
    //state to determine if the timer is running
    const [isRunning, setIsRunning] = useState(false);
    //state to track whether it is work or rest time
    const [isWorkTime, setIsWorkTime] = useState(true);
    //state to keep track of the remaining time in the current interval
    const [remainingTime, setRemainingTime] = useState(defaultWorkTime);

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
        else if (isRunning && remainingTime === 0 && currentRound < parseInt(rounds, 10)) {
            if (isWorkTime) {
                setIsWorkTime(false);
                setRemainingTime(parseInt(restTime, 10) || defaultRestTime);
            } else {
                setIsWorkTime(true);
                setCurrentRound((prevRound) => prevRound + 1);
                setRemainingTime(parseInt(workTime, 10) || defaultWorkTime);
            }
        }
        //if time runs out and all rounds are done, stop the timer
        else if (remainingTime === 0 && currentRound === parseInt(rounds, 10)) {
            setIsRunning(false);
        }

        //clear the timer when the component unmounts or values change
        return () => clearInterval(interval);
    }, [isRunning, remainingTime, currentRound, rounds, workTime, restTime, isWorkTime, defaultWorkTime, defaultRestTime]);


    //function to start or pause the timer
    const startPauseTimer = () => {
        setIsRunning(isRunning => !isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setRemainingTime(parseInt(workTime, 10) || defaultWorkTime);
        setCurrentRound(1);
        setIsWorkTime(true);
    };

    //function to fast forward to the end of the current interval
    const fastForwardTimer = () => {
        setRemainingTime(0);
        if (isWorkTime && currentRound === parseInt(rounds, 10)) {
            setIsRunning(false);
        }
    };

    //function to end the timer
    const endTimer = () => {
        setIsRunning(false);
        setRemainingTime(0);
        setCurrentRound(parseInt(rounds, 10) || defaultRounds);
        setIsWorkTime(false);
    };

    //handle changes in work time input
    const handleWorkTimeChange = (e) => {
        const value = e.target.value;
        setWorkTime(value);
        if (value === '') {
            setRemainingTime(0);
        } else {
            setRemainingTime(parseInt(value, 10) || defaultWorkTime);
        }
    };

    //handle changes in rest time input
    const handleRestTimeChange = (e) => {
        const value = e.target.value;
        setRestTime(value);
    };

    //handle changes in rounds input
    const handleRoundsChange = (e) => {
        const value = e.target.value;
        setRounds(value);
        if (value === '') {
            setCurrentRound(1);
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
            <DisplayRounds text={!isRunning && remainingTime === 0 ? `Total Rounds: ${parseInt(rounds, 10) || defaultRounds}` : isWorkTime ? `Round ${currentRound} of ${parseInt(rounds, 10) || defaultRounds}` : "Rest"} />
            <Panel>
                <Button label={isRunning ? 'Pause' : 'Start'} onClick={startPauseTimer} />
                <Button label="Reset" onClick={resetTimer} />
                <Button label="Fast Forward" onClick={fastForwardTimer} />
                <Button label="End" onClick={endTimer} />
            </Panel>
        </div>
    );
};

export default Tabata;
