import { useState, useEffect } from "react";
import React from "react";
import '../css/WordToGuess.css';
import LettersToTry from './LettersToTry.js';
import FullscreenButton from './FullscreenButton';
import HangmanDisplay from './HangmanDisplay.js';
import ColorChange from './ColorChange.js';
import Timer from './Timer.js';
import { TbClockCheck } from "react-icons/tb";
import Modal from "./Modal.js";
import { natureAndEasy, natureAndMedium, natureAndDifficult, entertainmentAndEasy, entertainmentAndMedium, entertainmentAndDifficult, societyAndEasy, societyAndMedium, societyAndDifficult, mixedAndEasy, mixedAndMedium, mixedAndDifficult, } from '../Words.js';
import CongratText from "./CongratText.js";

function WordToGuess() {
    let btnBckgroundClass = localStorage.getItem('btnBckgroundClass');
    let bodyBckgroundClass = localStorage.getItem('bodyBckgroundClass');
    document.body.classList.add(bodyBckgroundClass);

    if (document.getElementsByClassName('App')[0] !== undefined) {
        document.getElementsByClassName('App')[0].classList.add('gameApp');
    }

    let buttons = document.getElementsByTagName('button');
    let selectContainers = document.getElementsByClassName('selectContainer');
    let inputs = document.getElementsByTagName('input');
    let options = document.getElementsByTagName('option');


    for (let i = 0; i < buttons.length; i++) {
        let isChildOfColorChangeDiv = document.getElementById('colorChange').contains(buttons[i]);

        if (!isChildOfColorChangeDiv) {
            buttons[i].classList.add(btnBckgroundClass);
        }
    }

    for (let i = 0; i < selectContainers.length; i++) {
        selectContainers[i].classList.add(btnBckgroundClass + 'ForSelect');
    }

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.add(btnBckgroundClass);
    }

    for (let i = 0; i < options.length; i++) {
        options[i].classList.add(btnBckgroundClass);
    }

    const backToMainPage = () => {
        window.location.href = './index.html';
    };

    const data = JSON.parse(localStorage.getItem('formData'));
    let category = 'mixed';
    let level = 'easy';
    let timerChk = false;
    const gamersNickName = localStorage.getItem('gamersNickName');
    if (gamersNickName !== null) {
        if (gamersNickName.startsWith('"') && gamersNickName.endsWith('"')) {
            gamersNickName = gamersNickName.slice(1, -1);
        }
    }

    if (data !== null) {
        category = JSON.stringify(data.category, null, 2);
        level = JSON.stringify(data.level, null, 2);
        timerChk = JSON.stringify(data.timer, null, 2);
        if (category !== undefined) {
            if (category.startsWith('"') && category.endsWith('"')) {
                category = category.slice(1, -1);
            }
        } else {
            category = 'mixed';
        }

        if (level !== undefined) {
            if (level.startsWith('"') && level.endsWith('"')) {
                level = level.slice(1, -1);
            }
        } else {
            level = 'easy';
        }
    }

    const [linesForWordToGuess, setLinesForWordToGuess] = useState([]);
    const [word, setWord] = useState([]);
    const [goodGuess, setGoodGuess] = useState(0);
    const [wordSelected, setWordSelected] = useState(false);
    const [restartKey, setRestartKey] = useState(0); // Kulcs az újraindításhoz
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [currentResult, setCurrentResult] = useState(null);
    const [wrongGuess, setWrongGuess] = useState(0);
    const [markSrc, setMarkSrc] = useState('images/xmark.png');
    const [mouseSrc, setMouseSrc] = useState('images/mouse.png');
    let wordsToChoseFrom;
    let wrongGuessLimit;

    switch (level) {
        case 'easy':
            wrongGuessLimit = 8;
            break;
        case 'medium':
            wrongGuessLimit = 10;
            break;
        case 'hard':
            wrongGuessLimit = 12;
            break;
        default:
            wrongGuessLimit = 8;
            break;
    }

    const [allowedMistakes, setAllowedMistakes] = useState(wrongGuessLimit);

    switch (category) {
        case 'nature':
            wordsToChoseFrom = { easy: natureAndEasy, medium: natureAndMedium, hard: natureAndDifficult };
            break;
        case 'entertainment':
            wordsToChoseFrom = { easy: entertainmentAndEasy, medium: entertainmentAndMedium, hard: entertainmentAndDifficult };
            break;
        case 'society':
            wordsToChoseFrom = { easy: societyAndEasy, medium: societyAndMedium, hard: societyAndDifficult };
            break;
        default:
            wordsToChoseFrom = { easy: mixedAndEasy, medium: mixedAndMedium, hard: mixedAndDifficult };
            break;
    }

    const setOfWords = wordsToChoseFrom[level];

    function returnAWordToGuess() {
        localStorage.removeItem('currentResult');
        let indexOfRandomWord = Math.floor(Math.random() * setOfWords.length);
        setGoodGuess(0);
        setWrongGuess(0);
        setAllowedMistakes(wrongGuessLimit);
        setRestartKey((prevKey) => prevKey + 1);
        setMarkSrc('images/xmark.png');
        setMouseSrc('images/mouse.png');

        setOfWords.forEach(searchForTheValueFromSetOfWordsWithTheIndexOfRandomWord);

        function searchForTheValueFromSetOfWordsWithTheIndexOfRandomWord(item, index) {

            if (index === indexOfRandomWord) {
                let word = item;

                let linesForWordToGuess = Array.from(item).map((letterOfWordToGuess, indexOfLetterOfWordToGuess) =>
                    <li key={"letterAndLineContainer" + indexOfLetterOfWordToGuess} className="letterAndLineContainer">
                        <span key={"letterAboveLine" + indexOfLetterOfWordToGuess} className="letterAboveLine"></span>
                        <span key={indexOfLetterOfWordToGuess} className="lineForWordToGuess">&nbsp;_______&nbsp;</span>
                    </li>
                );

                setLinesForWordToGuess(linesForWordToGuess);
                setWord(word);
                setWordSelected(true);
            }

        }

        if (document.getElementById("ladderfootleft") !== null) {
            document.getElementById("ladderfootleft").style.opacity = "0";
            document.getElementById("ladderfootright").style.opacity = "0";
            document.getElementById("rung5").style.opacity = "0";
            document.getElementById("rung4").style.opacity = "0";
            document.getElementById("rung3").style.opacity = "0";
            document.getElementById("rung2").style.opacity = "0";
            document.getElementById("rung1").style.opacity = "0";

        }

        const elements = document.getElementsByClassName('letterAboveLine');
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerText = '';
        }

        if (document.getElementById('congratText')) document.getElementById('congratText').classList.remove('visible');
        if (document.getElementById('mark')) document.getElementById('mark').style.opacity = 0;
        if (document.getElementById('mouse')) document.getElementById('mouse').src = 'images/mouse.png';
        let lettersOfAbcFromThePreviousWord = document.getElementsByClassName('letters');
        (Array.from(lettersOfAbcFromThePreviousWord)).forEach((letterFromPreviousWord, indexOfLetterFromPreviousWord) => {
            letterFromPreviousWord.classList.remove('alreadyInWordLetter');
            letterFromPreviousWord.classList.remove('wrongLetterGuess');
            letterFromPreviousWord.classList.remove('untriedLetter');
        });

        return [linesForWordToGuess, word];
    }

    useEffect(() => {
        returnAWordToGuess();
    }, []);

    const handleGoodLetter = () => {
        // console.log(goodGuess);
        if (word.length > goodGuess) {
            setGoodGuess(goodGuess + 1);
            setMarkSrc('images/checkmark.png');
            setMouseSrc('images/yescheese.png');
            if (((word.length !== uniqueLetters.size) ? goodGuess+1 === uniqueLetters.size : goodGuess+1 === word.length)) {
                // function moveMouseToCheese() {
                //     const mouse = document.getElementById("mouse");
                //     const cheese = document.getElementById("cheese");
        
                //     const cheeseRect = cheese.getBoundingClientRect();
                //     const mouseRect = mouse.getBoundingClientRect();
        
                //     // A sajt középpontja
                //     const targetX = cheeseRect.left + (cheeseRect.width / 2) - (mouseRect.width / 2);
                //     const targetY = cheeseRect.top - mouseRect.height; // A sajt teteje
        
                //     let posX = mouseRect.left;
                //     let posY = mouseRect.top;
        
                //     const stepX = (targetX - posX) / 100; // Az X irányú lépés mértéke
                //     const stepY = (targetY - posY) / 100; // A Y irányú lépés mértéke
        
                //     let id = setInterval(() => {
                //         posX += stepX;
                //         posY += stepY;
        
                //         mouse.style.left = posX + "px"; // Beállítjuk az X pozíciót
                //         mouse.style.top = posY + "px"; // Beállítjuk az Y pozíciót
        
                //         // Ellenőrizzük, hogy elérte-e a cél pozíciót
                //         if (Math.abs(posX - targetX) < Math.abs(stepX) && Math.abs(posY - targetY) < Math.abs(stepY)) {
                //             clearInterval(id); // Megállítjuk az animációt
                //             mouse.style.left = targetX + "px"; // Beállítjuk az X pozíciót
                //             mouse.style.top = targetY + "px"; // Beállítjuk az Y pozíciót
                //         }
                //     }, 5); // Az intervallum beállítása
                // }
        
                // moveMouseToCheese(); // Az animáció elindítása
        
            }
        }
    };

    const handleWrongLetter = () => {
        setWrongGuess(wrongGuess + 1);
        setAllowedMistakes(wrongGuessLimit - wrongGuess - 1);
        setMarkSrc('images/xmark.png');
        setMouseSrc('images/mouse.png');
        // console.log(wrongGuess);
        // console.log(wrongGuessLimit);
    };

    const uniqueLetters = new Set();

    for (let i = 0; i < word.length; i++) {
        const letter = word[i].toLowerCase();
        if (/[a-zA-Z]/.test(letter)) {
            uniqueLetters.add(letter);
        }
    }

    const storedData = localStorage.getItem('bestTimes');
    let bestTimes = {};

    try {
        // Parse stored data, but ensure it defaults to an empty object
        bestTimes = storedData ? JSON.parse(storedData) : {};

        // Ensure bestTimes is an object
        if (typeof bestTimes !== 'object' || Array.isArray(bestTimes)) {
            console.error("bestTimes is not an object:", bestTimes);
            bestTimes = {}; // Default to empty object if it's not valid
        }
    } catch (error) {
        console.error("Error parsing bestTimes:", error);
        bestTimes = {}; // Default to empty object in case of JSON parsing error
    }

    let countCatLevelTimes = 0;
    let bestTimesLayout = Object.keys(bestTimes).map((categoryLevelKey, index) => {
        let catLevel = (category + '-' + level).toLowerCase();
        if (categoryLevelKey === catLevel) {
            countCatLevelTimes++;
            const bestTimesForCategory = bestTimes[categoryLevelKey];
            if (bestTimesForCategory !== undefined) {
                // Render each list of best times for a given category-level
                let bestTimesForCategoryLayout = bestTimesForCategory.map((bestTime, idx) => {
                    let bestTimeMinSec, min, sec;

                    if (bestTime.time > 60) {
                        // Calculate minutes and seconds
                        min = Math.floor(bestTime.time / 60);
                        sec = bestTime.time - min * 60;

                        // Format minutes and seconds
                        bestTimeMinSec = `${min}m ${sec.toString().padStart(2, '0')}s`; // Ensure seconds are always two digits
                    } else {
                        // If the time is less than 60 seconds, display seconds only
                        bestTimeMinSec = `${bestTime.time}s`;
                    }

                    return (
                        <li key={idx}>
                            {bestTime.name}&nbsp;&nbsp;{bestTimeMinSec}
                        </li>
                    );
                });
                return (
                    <>
                        <ol id="bestTimesOL" key={index}>
                            {bestTimesForCategoryLayout}
                        </ol>
                    </>
                );
            } else {
                return 'There are no best times yet.';
            }
        }
    });

    if (countCatLevelTimes === 0) {
        bestTimesLayout = 'There are no best times yet.';
    }
    return (
        <>
            <div id="gnameAndWordAndFullscreen">
                <div id="gnameAndTimerAndAllowedMistakes">
                    {gamersNickName !== null ? <h1 id="gamerName">Hi, {gamersNickName}!</h1> : null}
                    {timerChk && <Timer wrongGuess={wrongGuess} wrongGuessLimit={wrongGuessLimit} setCurrentResult={setCurrentResult} goodGuess={goodGuess} word={word} category={category} level={level} uniqueLettersSize={uniqueLetters.size} restartKey={restartKey} gamersNickName={gamersNickName}></Timer>}
                    <p>Allowed mistakes: {allowedMistakes}</p>
                    {timerChk && <TbClockCheck className="bestTimesClockIcon" onClick={openModal} />}
                </div>
                <ul>
                    {linesForWordToGuess}
                    <li className="letterAndLineContainer">
                        <span className="imgAboveLine">
                            <img src={markSrc} alt="mark" id="mark"></img>
                        </span>
                    </li>
                </ul>
                <FullscreenButton />
            </div>
            <CongratText currentResult={currentResult} goodGuess={goodGuess} uniqueLettersSize={uniqueLetters.size} word={word}></CongratText>
            <div id="drawingDiv">
                <img className="mouse" id="mouse" alt="mouse" src={mouseSrc} title="mouse"></img>
                <div id="ladderAndCheese">
                    {wordSelected && <HangmanDisplay goodGuess={goodGuess} word={word}></HangmanDisplay>}
                    <img className="cheese" src='images/cheese.png' alt="cheese" title="cheese" id="cheese"></img>
                </div>
            </div>
            <div id="buttonDiv">
                <button type="button" onClick={returnAWordToGuess} id="btnIWantAWord">I want another word!</button>
                <button type="button" id="backBtn" onClick={backToMainPage}>Back to the main page!</button>
            </div>
            <LettersToTry wrongGuessLimit={wrongGuessLimit} word={word} goodGuess={goodGuess} onGoodLetter={handleGoodLetter} wrongGuess={wrongGuess} onWrongLetter={handleWrongLetter}></LettersToTry>
            <div id="selectedCatAndLevelAndColor">
                <ColorChange />
                <h1>Selected category: {category !== undefined ? category.toUpperCase() : ''} &nbsp;&nbsp; Selected level: {level !== undefined ? level.toUpperCase() : ''}</h1>
            </div>
            {timerChk && <Modal isOpen={isModalOpen} category={category} level={level} onClose={closeModal} title="Best Times">
                {(bestTimesLayout.length > 0) ? bestTimesLayout : 'There are no best times yet.'}
            </Modal>}
        </>
    )

}

export default WordToGuess;