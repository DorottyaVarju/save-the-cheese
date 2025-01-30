import React, { useState, useEffect, useRef } from "react";
import '../css/Timer.css';

const Timer = (props) => {
    const { word, goodGuess, uniqueLettersSize, category, level, restartKey, gamersNickName } = props;
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
                    if (((word.length !== uniqueLettersSize) ? goodGuess === uniqueLettersSize : goodGuess === word.length)) {
                        clearInterval(timerInterval.current); // Stop the timer
                        timerStopped.current = true; // Set the timer stop flag
                        if (document.getElementById('mark')) document.getElementById('mark').src = 'images/checkmark.png';
                        if (!isSaved.current) {
                            // Saving the result
                            isSaved.current = true; // Set the flag to true to prevent multiple saves

                            const storedData = localStorage.getItem('bestTimes');
                            const bestTimes = storedData ? JSON.parse(storedData) : {};

                            // Assuming category and level are passed in as props or state variables
                            const newBestTime = {
                                name: gamersNickName || 'Anonymous',
                                time: updatedTime / 1000, // Convert time from milliseconds to seconds
                                category: category,
                                level: level
                            };

                            // Create a category-level key (e.g., "easy-1" for category 'easy' and level 1)
                            const categoryLevelKey = `${category}-${level}`;

                            // Check if the category-level already exists in bestTimes
                            if (!bestTimes[categoryLevelKey]) {
                                bestTimes[categoryLevelKey] = [];
                            }

                            // Add the new best time to the corresponding category-level array
                            bestTimes[categoryLevelKey].push(newBestTime);

                            // Sort the times for that category-level by time
                            bestTimes[categoryLevelKey].sort((a, b) => a.time - b.time);

                            // Keep only the top 10 results for that category-level
                            if (bestTimes[categoryLevelKey].length > 10) {
                                bestTimes[categoryLevelKey].length = 10;
                            }

                            // Get the rank of the current player within their category-level
                            const rank = bestTimes[categoryLevelKey].findIndex(time => time === newBestTime) + 1;

                            // Create a result to be stored in localStorage (this can be used later to show the current rank)
                            const currentResult = [rank, newBestTime.name, newBestTime.time, newBestTime.category, newBestTime.level];

                            // Store the current result and the updated bestTimes back to localStorage
                            localStorage.setItem('currentResult', JSON.stringify(currentResult));
                            localStorage.setItem('bestTimes', JSON.stringify(bestTimes));

                            // For debugging purposes, log the result
                            // console.log(newBestTime);
                            // console.log(bestTimes);

                        }
                    }

                    return updatedTime;
                });
            }, 1000);
        }

        // Cleanup: clear the interval if component is unmounted or timer stopped
        return () => clearInterval(timerInterval.current);
    }, [timeElapsed, word, goodGuess, uniqueLettersSize, gamersNickName]); // Dependencies list

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
