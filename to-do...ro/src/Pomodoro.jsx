import React, { useState, useEffect } from "react";
import {useSound} from 'use-sound';

function Pomodoro(){
    const workDuration = 25 * 60; // 25 minutes in seconds
    const shortbreakDuration = 5 * 60; // 5 minutes in seconds
    const longbreakDuration = 15 * 60; // 15 minutes in seconds

    const [timeLeft, setTimeLeft] = useState(workDuration);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true);

    // TODO: Counting the amount of Pomodoro's done
    const [pomodoroCount, setPomodoroCount] = useState(1);
    const [displayCount, setDisplayCount] = useState(1);

    // TODO: create functions to have this where i can edit the rest and work durations
    // parang this is more complex than i thought, but i guess another button tas use yung onChange and input

    // TODO: Toggling in between rest and work, additionally, i want to have a LONG break every 3rd
    // --- manual mode buttons ---
    function setWorkSession() {
        setIsWorkSession(true);
        setTimeLeft(workDuration);
        setIsRunning(false);
    }

    function setShortBreakSession() {
        setIsWorkSession(false);
        setTimeLeft(shortbreakDuration);
        setIsRunning(false);
    }

    function setLongBreakSession() {
        setIsWorkSession(false);
        setTimeLeft(longbreakDuration);
        setIsRunning(false);
    }

    
    // TODO: Jazz Sound playing when work

    // --- Format seconds -> MM:SS ---
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // --- Timer logic ---
    useEffect(() => {
        let timer = null;
        if (isRunning && timeLeft > 0) {
        timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        } else if (timeLeft === 0) {
            if (isWorkSession){
                let newCount = pomodoroCount;
                console.log(newCount);
                if (newCount % 3 === 0){
                    setIsWorkSession(false);
                    setTimeLeft(longbreakDuration);
                    console.log("third");
                } else {
                    setIsWorkSession(false);
                    setTimeLeft(shortbreakDuration);
                    console.log("else");
                }
                newCount = pomodoroCount + 1;
                setPomodoroCount(newCount); 
                setIsRunning(false);
            } else {
                setIsWorkSession(true);
                setTimeLeft(workDuration);
                setDisplayCount(pomodoroCount);
                setIsRunning(false);
            }
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, isWorkSession, longbreakDuration, shortbreakDuration, workDuration, pomodoroCount]);

    return(
        <div className="pomodoro-container">
        <h1 className="pomodoro-title">
            {isWorkSession ? "Work Session" : "Break Time"} # {displayCount}
        </h1>
        <div className="pomodoro-timer">{formatTime(timeLeft)}</div>
        <div className="pomodoro-buttons">
            <button
            className="pomodoro-button start"
            onClick={() => setIsRunning(true)}
            >
            Start
            </button>
            <button
            className="pomodoro-button pause"
            onClick={() => setIsRunning(false)}
            >
            Pause
            </button>
            <button
            className="pomodoro-button reset"
            onClick={() => {
                setIsRunning(false);
                if (isWorkSession) {
                    // Reset to a fresh work session
                    setTimeLeft(workDuration);
                } else {
                    // Reset to break depending on count
                if (pomodoroCount % 3 === 0) {
                    setTimeLeft(longbreakDuration);
                } else {
                    setTimeLeft(shortbreakDuration);
                }
            }}}>
            Reset
            </button>
        </div>
        <div className="pomodoro-modes">
            <button
            className="pomodoro-mode work"
            onClick={setWorkSession}
            >
            Work
            </button>
            <button
            className="pomodoro-mode shortBreak"
            onClick={setShortBreakSession}
            >
            Short Break
            </button>
            <button
            className="pomodoro-mode longBreak"
            onClick={setLongBreakSession}
            >
            Long Break
            </button>
        </div>
        </div>
    )
}

export default Pomodoro;