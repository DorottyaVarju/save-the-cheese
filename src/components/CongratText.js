import React, { useState, useEffect } from "react";
import '../css/CongratText.css';

const CongratText = ({ restartKey, goodGuess, uniqueLettersSize, word }) => {
    const [bestTime, setBestTime] = useState('');
    const [name, setName] = useState('');
    const [rank, setRank] = useState('');
    
    useEffect(() => {
        const storedCRData = localStorage.getItem('currentResult');
        const currentResult = storedCRData ? JSON.parse(storedCRData) : [];
        console.log(currentResult);
        if(currentResult.length !== 0){
            let minCR, secCR, bestTimeMinSecCR;
            if (currentResult[2] > 60) {
                minCR = currentResult[2] / 60;
                secCR = currentResult[2] - (minCR * 60);
                bestTimeMinSecCR = minCR + 'm ' + secCR + 's';
            } else {
                bestTimeMinSecCR = currentResult[2] + 's';
            }
            setBestTime(bestTimeMinSecCR);
            setName(currentResult[1]);
            setRank(currentResult[0]);
            if(bestTime !== '' && ((word.length !== uniqueLettersSize) ? goodGuess === uniqueLettersSize : goodGuess === word.length)){
                document.getElementById('congratText').style.opacity = 1;
            }
        }
    }, [goodGuess]);

    return (
        <div id="congratText">
            <h4>Congratulations, {name}, you made it to the top 10 list!</h4>
            <h6>Time: {bestTime}, Rank: {rank}.</h6>
        </div>
    );
};

export default CongratText;