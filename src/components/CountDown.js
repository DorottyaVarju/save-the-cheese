import React, { useState, useEffect } from "react";
import '../css/CountDown.css';

const CountdownTimer = (props) => {
    const { word, goodGuess, uniqueLettersSize, initialTime, restartKey, gamersNickName } = props;
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        setTimeRemaining(initialTime);
    }, [restartKey]);

    useEffect(() => {
        let isSaved = false; // Guard flag
        if (timeRemaining > 0) {
            const countdownInterval = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    const updatedTime = prevTime - 1000;

                    if (updatedTime <= 0 && ((word.length !== uniqueLettersSize) ? goodGuess !== uniqueLettersSize : goodGuess !== word.length)) {
                        clearInterval(countdownInterval);

                        Array.from(document.getElementsByClassName('letters')).forEach((letter) => {
                            letter.classList.add('untriedLetter');
                        });
                        if (document.getElementById('mark')) document.getElementById('mark').src = 'images/xmark.png';
                        const elements = document.getElementsByClassName('letterAboveLine');
                        for (let i = 0; i < elements.length; i++) {
                            elements[i].innerText = word[i];
                        }
                        document.getElementById('mark').style.opacity = 1;

                        return 0;
                    }

                    else if (goodGuess > 0 && ((word.length !== uniqueLettersSize) ? goodGuess === uniqueLettersSize : goodGuess === word.length)) {
                        if (!isSaved && prevTime > 0) {
                            isSaved = true;
                            clearInterval(countdownInterval);

                            const storedData = localStorage.getItem('bestTimes');
                            const bestTimes = storedData ? JSON.parse(storedData) : [];
                            const newBestTime = {
                                name: (gamersNickName !== null) ? gamersNickName : 'Anonymous',
                                time: initialTime - prevTime
                            };

                            bestTimes.push(newBestTime);
                            bestTimes.sort((a, b) => a.time - b.time);

                            if (bestTimes.length > 10) {
                                bestTimes.length = 10;
                            }

                            localStorage.setItem('bestTimes', JSON.stringify(bestTimes));
                            console.log("Best times updated:", bestTimes);
                        }
                        return prevTime;
                    }
                    return updatedTime;
                });
            }, 1000);

            return () => clearInterval(countdownInterval);
        }
    }, [timeRemaining]);



    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="countdownTimerContainer">
            {formatTime(timeRemaining)}
        </div>
    );
};

export default CountdownTimer;