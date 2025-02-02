import React from "react";
import '../css/CongratText.css';

const CongratText = ({ currentResult, goodGuess, word, uniqueLettersSize }) => {
    return (
        <div id="congratText">
            {(currentResult && ((word.length !== uniqueLettersSize) ? goodGuess === uniqueLettersSize : goodGuess === word.length)) &&(
                <>
                    <h5>Time: {currentResult[2]}s{currentResult && currentResult[0] !== 0 && `, Rank: ${currentResult[0]}`}</h5>
                    {currentResult && currentResult[0] !== 0 && (
                        <h5>Congratulations, {currentResult[1]}, you made it to the top 10 list!</h5>
                    )}
                </>
            )}
        </div>
    );
};

export default CongratText;