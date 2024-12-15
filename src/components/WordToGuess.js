import { useState, useEffect } from "react";
import React from "react";
import '../css/WordToGuess.css';
import LettersToTry from './LettersToTry.js';
import HangmanDisplay from './HangmanDisplay.js';
import checkmark from '../images/checkmark.png';
import xmark from '../images/xmark.png';
import mouse from '../images/mouse.png';
import yescheese from '../images/yescheese.png';
import cheese from '../images/cheese.png';
import { natureAndEasy, natureAndMedium, natureAndDifficult, entertainmentAndEasy, entertainmentAndMedium, entertainmentAndDifficult, societyAndEasy, societyAndMedium, societyAndDifficult, mixedAndEasy, mixedAndMedium, mixedAndDifficult, } from '../Words.js';

function WordToGuess() {
    let btnBckgroundClass = localStorage.getItem('btnBckgroundClass');
    let bodyBckgroundClass = localStorage.getItem('bodyBckgroundClass');
    document.body.classList.add(bodyBckgroundClass);

    let buttons = document.getElementsByTagName('button');
    let selects = document.getElementsByTagName('select');
    let inputs = document.getElementsByTagName('input');
    let options = document.getElementsByTagName('option');

    
    for (let i = 0; i < buttons.length; i++) {
        let isChildOfColorChangeDiv = document.getElementById('colorChange').contains(buttons[i]);

        if (!isChildOfColorChangeDiv) {
                buttons[i].classList.add(btnBckgroundClass);
        }
    }
    
    for (let i = 0; i < selects.length; i++) {
        selects[i].classList.add(btnBckgroundClass);
    }
    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.add(btnBckgroundClass);
    }
    
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add(btnBckgroundClass);
    }

    const backToMainPage = () => {
        window.location.href = '/feed-the-mouse/';
    };

    const data = JSON.parse(localStorage.getItem('formData'));
    let category = 'mixed';
    let level = 'easy';
    let gamerName = '';

    if(data !== null) {
        category = JSON.stringify(data.category, null, 2);
        level = JSON.stringify(data.level, null, 2);
        gamerName = JSON.stringify(data.name, null, 2);

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

        if(gamerName !== undefined) {
            if (gamerName.startsWith('"') && gamerName.endsWith('"')) {
                gamerName = gamerName.slice(1, -1);
            }
        }
    }

    const [linesForWordToGuess, setLinesForWordToGuess] = useState([]);
    const [word, setWord] = useState([]);
    const [goodGuess, setGoodGuess] = useState(0);
    const [wordSelected, setWordSelected] = useState(false);
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
        if( document.getElementById('mouse')) document.getElementById('mouse').src = mouse;
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

    return (
        <>
            <div id="gameDiv">
                <ul>
                    {linesForWordToGuess}
                    <li className="letterAndLineContainer">
                        <span className="imgAboveLine">
                            <img src={goodGuess < {word}.length ? xmark : checkmark} alt="mark" id="mark"></img>
                        </span>
                    </li>
                </ul>
                <br></br>
                <div id="drawingDiv">
                    <img className="mouse" id="mouse" alt="mouse" src={goodGuess < {word}.length ? yescheese : mouse} title="mouse"></img>
                    <div id="ladderAndCheese">
                        {wordSelected && <HangmanDisplay goodGuess={goodGuess} word={word}></HangmanDisplay>}
                        <img className="cheese" src={cheese} alt="cheese" title="cheese"></img>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div id="buttonDiv">
                    <button type="button" onClick={returnAWordToGuess} id="btnIWantAWord">I want another word!</button>
                    <button type="button" id="backBtn" onClick={backToMainPage}>Back to the main page!</button>
                </div>
            </div>
            <LettersToTry word={word} goodGuess={goodGuess} onGoodLetter={handleGoodLetter}></LettersToTry>
            <h1 id="gamerName">{gamerName !== '' ? 'Hi, '+gamerName+'!' : ''}</h1>
            <div id="selectedCatAndLevel">
                <h1>Selected category: {category !== undefined ? category.toUpperCase() : ''} &nbsp;&nbsp; Selected level: {level !== undefined ? level.toUpperCase() : ''}</h1>
            </div>  
        </>
    )

}

export default WordToGuess;