import React, { useState, useEffect, useRef } from "react";
import '../css/Timer.css';

const Timer = (props) => {
    const { wrongGuess, wrongGuessLimit, word, goodGuess, uniqueLettersSize, category, level, restartKey, gamersNickName, setCurrentResult } = props;
    const [timeElapsed, setTimeElapsed] = useState(0);
    const isSaved = useRef(false);
    const timerInterval = useRef(null);
    const timerStopped = useRef(false);

    useEffect(() => {
        setTimeElapsed(0);
        isSaved.current = false;
        timerStopped.current = false;
    }, [restartKey]);

    useEffect(() => {
        if (timerInterval.current) {
            clearInterval(timerInterval.current);
        }

        if (!timerStopped.current) {
            timerInterval.current = setInterval(() => {
                setTimeElapsed((prevTime) => {
                    const updatedTime = prevTime + 1000;

                    // If certain conditions are met, stop the timer and save the result
                    if (((word.length !== uniqueLettersSize) ? goodGuess === uniqueLettersSize : goodGuess === word.length) || wrongGuess+1 >= wrongGuessLimit) {
                        clearInterval(timerInterval.current); // Stop the timer
                        timerStopped.current = true; // Set the timer stop flag
                        if (!isSaved.current && wrongGuess+1 < wrongGuessLimit) {
                            // Saving the result
                            isSaved.current = true; // Set the flag to true to prevent multiple saves

                            const newBestTime = {
                                name: gamersNickName || 'Anonymous',
                                time: prevTime / 1000, // Convert time from milliseconds to seconds
                                category: category,
                                level: level
                            };

                            const categoryLevelKey = `${category}-${level}`;

                            const storedData = localStorage.getItem('bestTimes');
                            const bestTimes = storedData ? JSON.parse(storedData) : {};

                            if (!bestTimes[categoryLevelKey]) {
                                bestTimes[categoryLevelKey] = [];
                            }

                            bestTimes[categoryLevelKey].push(newBestTime);
                            bestTimes[categoryLevelKey].sort((a, b) => a.time - b.time);

                            if (bestTimes[categoryLevelKey].length > 10) {
                                bestTimes[categoryLevelKey].length = 10;
                            }

                            const rank = bestTimes[categoryLevelKey].findIndex(time => time === newBestTime) + 1;

                            const currentResult = [rank, newBestTime.name, newBestTime.time, newBestTime.category, newBestTime.level];

                            // Update the parent component with the current result
                            if (setCurrentResult) {
                                setCurrentResult(currentResult); // Pass the result to the parent component
                            }

                            localStorage.setItem('currentResult', JSON.stringify(currentResult));
                            localStorage.setItem('bestTimes', JSON.stringify(bestTimes));
                        }
                        return prevTime;
                    }

                    return updatedTime;
                });
            }, 1000);
        }

        return () => clearInterval(timerInterval.current);
    }, [timeElapsed, word, goodGuess, uniqueLettersSize, gamersNickName]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="timerContainer">
            {formatTime(timeElapsed)}
        </div>
    );
};

export default Timer;