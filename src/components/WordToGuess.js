import { useState, useEffect } from "react";
import React from "react";
import '../css/WordToGuess.css';
import LettersToTry from './LettersToTry.js';
import FullscreenButton from './FullscreenButton';
import HangmanDisplay from './HangmanDisplay.js';
import ColorChange from './ColorChange.js';
import CountDown from './CountDown.js';
import { TbClockCheck } from "react-icons/tb";
import Modal from "./Modal.js";

import { natureAndEasy, natureAndMedium, natureAndDifficult, entertainmentAndEasy, entertainmentAndMedium, entertainmentAndDifficult, societyAndEasy, societyAndMedium, societyAndDifficult, mixedAndEasy, mixedAndMedium, mixedAndDifficult, } from '../Words.js';

function WordToGuess() {
    let btnBckgroundClass = localStorage.getItem('btnBckgroundClass');
    let bodyBckgroundClass = localStorage.getItem('bodyBckgroundClass');
    document.body.classList.add(bodyBckgroundClass);

    if(document.getElementsByClassName('App')[0] !== undefined) {
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
        selectContainers[i].classList.add(btnBckgroundClass+'ForSelect');
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
    const gamersNickName = localStorage.getItem('gamersNickName');
    if(gamersNickName !== null) {
        if (gamersNickName.startsWith('"') && gamersNickName.endsWith('"')) {
            gamersNickName = gamersNickName.slice(1, -1);
        }
    }

    if(data !== null) {
        category = JSON.stringify(data.category, null, 2);
        level = JSON.stringify(data.level, null, 2);

        if(category !== undefined) {
            if (category.startsWith('"') && category.endsWith('"')) {
                category = category.slice(1, -1);
            }
        } else {
            category = 'mixed';
        }

        if(level !== undefined) {
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
    const initialTime = 10000;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    let wordsToChoseFrom;

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
        let indexOfRandomWord = Math.floor(Math.random() * setOfWords.length);
        setGoodGuess(0);
        setRestartKey((prevKey) => prevKey + 1);

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
         
        if(document.getElementById("ladderfootleft") !== null){
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

        document.getElementById('mark').style.opacity = 0;
        if( document.getElementById('mouse')) document.getElementById('mouse').src = 'images/mouse.png';
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
        if (word.length > goodGuess) {
          setGoodGuess(goodGuess + 1);
        }
    };

    const uniqueLetters = new Set();

    for (let i = 0; i < word.length; i++) {
        const letter = word[i].toLowerCase();
        if (/[a-zA-Z]/.test(letter)) {
            uniqueLetters.add(letter);
        }
    }

    const storedData = localStorage.getItem('bestTimes');
    const bestTimes = storedData ? JSON.parse(storedData) : [];
    let bestTimesLayout = bestTimes.map((bestTime, index) => {
        return (
            <li key={index}>
                {bestTime.name}&nbsp;&nbsp;{bestTime.time}
            </li>
        );
    });

    return (
        <>
            <div id="gnameAndWordAndFullscreen">
                <div>
                    {gamersNickName !== null ? <h1 id="gamerName">Hi, {gamersNickName}!</h1> : null}
                    <CountDown goodGuess={goodGuess} word={word} uniqueLettersSize={uniqueLetters.size} initialTime={initialTime} restartKey={restartKey} gamersNickName = {gamersNickName}></CountDown>
                    <TbClockCheck className="bestTimesClockIcon" onClick={openModal}/>
                </div>             
                <ul>
                    {linesForWordToGuess}
                    <li className="letterAndLineContainer">
                        <span className="imgAboveLine">
                            <img src={goodGuess > 0 && ((word.length !== uniqueLetters.size) ? goodGuess === uniqueLetters.size : goodGuess === word.length) ? 'images/checkmark.png' : 'images/xmark.png'} alt="mark" id="mark"></img>
                        </span>
                    </li>
                </ul>
                <FullscreenButton />
            </div>
            <div id="drawingDiv">
                <img className="mouse" id="mouse" alt="mouse" src={goodGuess > 0 && ((word.length !== uniqueLetters.size) ? goodGuess === uniqueLetters.size : goodGuess === word.length) ? 'images/yescheese.png' : 'images/mouse.png'} title="mouse"></img>
                <div id="ladderAndCheese">
                    {wordSelected && <HangmanDisplay goodGuess={goodGuess} word={word}></HangmanDisplay>}
                    <img className="cheese" src='images/cheese.png' alt="cheese" title="cheese"></img>
                </div>
            </div>
            <div id="buttonDiv">
                <button type="button" onClick={returnAWordToGuess} id="btnIWantAWord">I want another word!</button>
                <button type="button" id="backBtn" onClick={backToMainPage}>Back to the main page!</button>
            </div>
            <LettersToTry word={word} goodGuess={goodGuess} onGoodLetter={handleGoodLetter}></LettersToTry>
            <div id="selectedCatAndLevelAndColor">
                <ColorChange />
                <h1>Selected category: {category !== undefined ? category.toUpperCase() : ''} &nbsp;&nbsp; Selected level: {level !== undefined ? level.toUpperCase() : ''}</h1>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Best Times">
                <ol id="bestTimesOL">{bestTimesLayout}</ol>
            </Modal>  
        </>
    )

}

export default WordToGuess;