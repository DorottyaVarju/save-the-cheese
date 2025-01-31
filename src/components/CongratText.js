import React, { useEffect, useState } from "react";
import '../css/CongratText.css';

const CongratText = ({ currentResult }) => {
    return (
        <div id="congratText">
            {currentResult && (
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