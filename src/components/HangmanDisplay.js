import React from "react";
import '../css/HangmanDisplay.css';
import { useEffect } from "react";

function HangmanDisplay(props) {

    const { word, goodGuess } = props;
    document.getElementById("drawingDiv").style.opacity = "1";

    let ladder = document.getElementById('ladder');
    let rung2 = document.getElementById('rung2');
    let rung3 = document.getElementById('rung3');
    let rung4 = document.getElementById('rung4');
    let rung5 = document.getElementById('rung5');
    let rungs = document.getElementsByClassName('rung');
    let ladderfoot, ladderHeight;

    const uniqueLetters = new Set();

    for (let i = 0; i < word.length; i++) {
        const letter = word[i].toLowerCase();
        if (/[a-zA-Z]/.test(letter)) {
            uniqueLetters.add(letter);
        }
    }

    switch (uniqueLetters.size) {
        case 5:
            if (ladder !== null) {
                for (let i = 0; i < rungs.length; i++) {
                    rungs[i].style.width = '90px';
                }
                rung3.style.marginLeft = '15px';
                rung4.style.marginLeft = '5px';
                rung5.style.marginLeft = '-5px';
            }
            ladderHeight = '132px';
            ladderfoot = '../public/images/ladderMedium.png';
            break;
        case 6:
            if (ladder !== null) {
                for (let i = 0; i < rungs.length; i++) {
                    rungs[i].style.width = '115px';
                }
                rung2.style.marginLeft = '20px';
                rung3.style.marginLeft = '10px';
                rung4.style.marginLeft = '0px';
                rung5.style.marginLeft = '-10px';
            }
            ladderHeight = '175px';
            ladderfoot = '../public/images/ladderMedium.png';
            break;
        case 7:
            ladderHeight = '220px';
            ladderfoot = '../public/images/ladderHard.png';
            break;
        default:
            if (ladder !== null) {
                ladder.style.height = '108px';
                for (let i = 0; i < rungs.length; i++) {
                    rungs[i].style.width = '108px';
                }
                rung4.style.marginLeft = '10px';
                rung5.style.marginLeft = '-10px';
            }
            ladderHeight = '108px';
            ladderfoot = '../public/images/ladderEasy.png';
    }

    useEffect(() => {

        if (goodGuess > 0) {
            document.getElementById("ladderfootleft").style.opacity = "1";
        }

        if (goodGuess > 1) {
            document.getElementById("ladderfootright").style.opacity = "1";
        }

        if (goodGuess > 2) {
            document.getElementById("rung5").style.opacity = "1";
        }

        if (goodGuess > 3) {
            document.getElementById("rung4").style.opacity = "1";
        }

        if (goodGuess > 4) {
            document.getElementById("rung3").style.opacity = "1";
        }

        if (goodGuess > 5) {
            document.getElementById("rung2").style.opacity = "1";
        }

        if (goodGuess > 6) {
            document.getElementById("rung1").style.opacity = "1";
        }

    }, [goodGuess]);

    return (
        <div id="ladder" style={{height: ladderHeight}}>
            <div id="ladderFootDiv">
                <img className="ladderfoot" id="ladderfootleft" alt="ladderfootleft" src={ladderfoot} title="ladderfootleft"></img>
                <img className="ladderfoot" id="ladderfootright" alt="ladderfootright" src={ladderfoot} title="ladderfootright"></img>
            </div>
            <div id="rungDiv">
                <img className="rung" id="rung1" alt="rung1" src="../public/images/rung.png" title="rung"></img>
                <img className="rung" id="rung2" alt="rung2" src="../public/images/rung.png" title="rung"></img>
                <img className="rung" id="rung3" alt="rung3" src="../public/images/rung.png" title="rung"></img>
                <img className="rung" id="rung4" alt="rung4" src="../public/images/rung.png" title="rung"></img>
                <img className="rung" id="rung5" alt="rung5" src="../public/images/rung.png" title="rung"></img>
            </div>
        </div>
    );
}

export default HangmanDisplay;