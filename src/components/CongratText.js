import React from "react";
import '../css/CongratText.css';

const CongratText = ({ currentResult, goodGuess, word, uniqueLettersSize, wrongGuess, wrongGuessLimit }) => {
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
            {(wrongGuess === wrongGuessLimit) &&(
                <>
                    <h5>You have used up all your {wrongGuessLimit} chances to make mistakes.</h5>
                </>
            )}
        </div>
    );
};

export default CongratText;