import { useState } from "react";
import React from "react";
import '../css/WordToGuess.css';
import LettersToTry from './LettersToTry.js';
import HangmanDisplay from './HangmanDisplay.js';
import checkmark from'../images/checkmark.png';

function WordToGuess(){

    const [linesForWordToGuess, setLinesForWordToGuess] = useState([]);
    const [word, setWord] = useState([]);
    const [wrongGuess, setWrongGuess] = useState(0);
    const [wordSelected, setWordSelected] = useState(false);

    const setOfWords = [
        'APPLE',
        'PEAR',
        'ORANGE', 
        'BREAD', 
        'TABLE', 
        'COMPUTER', 
        'MOUSE',
        'BED',
        'FLOWER'
    ];

    function returnAWordToGuess() {

        let indexOfRandomWord = Math.floor(Math.random() * setOfWords.length);

        setOfWords.forEach(searchForTheValueFromSetOfWordsWithTheIndexOfRandomWord);

        function searchForTheValueFromSetOfWordsWithTheIndexOfRandomWord(item, index){

            if(index === indexOfRandomWord){
                    let word = item;
                    let linesForWordToGuess = [];

                    (Array.from(item)).forEach((letterOfWordToGuess, indexOfLetterOfWordToGuess)=>{
                        linesForWordToGuess.push(<span key={"letterAndLineContainer"+indexOfLetterOfWordToGuess} className="letterAndLineContainer"><span key={"letterAboveLine"+indexOfLetterOfWordToGuess} className="letterAboveLine"></span><span key={indexOfLetterOfWordToGuess} className="lineForWordToGuess">&nbsp;_______&nbsp;</span></span>);
                    });
                    setLinesForWordToGuess(linesForWordToGuess);
                    setWord(word);
                    setWrongGuess(0);
                    setWordSelected(true);
            } 

        }

        const elements = document.getElementsByClassName('letterAboveLine');
            for (let i = 0; i < elements.length; i++) {
            elements[i].innerText = '';
        }

        document.getElementById('checkmark').style.opacity = 0;

        let lettersOfAbcFromThePreviousWord = document.getElementsByClassName('letters');
        (Array.from(lettersOfAbcFromThePreviousWord)).forEach((letterFromPreviousWord, indexOfLetterFromPreviousWord)=>{
            letterFromPreviousWord.classList.remove('alreadyInWordLetter');
            letterFromPreviousWord.classList.remove('wrongLetterGuess');
        });

        return [linesForWordToGuess, word];
    }

    const backToMainPage = () => {
        window.location.href = '/';
    };

    return(
        <div>
            {linesForWordToGuess}
            <img src={checkmark} alt="checkmark" id="checkmark"></img>
            <button id="backBtn" onClick={backToMainPage}>Back to the main page!</button>
            <br></br>
            {wordSelected && <HangmanDisplay wrongGuess={wrongGuess}></HangmanDisplay>}
            <br></br>
            <br></br>
            <button type="button" onClick={returnAWordToGuess} id="btnIWantAWord">I want a word!</button>
            <LettersToTry word={word} onWrongLetter={() => setWrongGuess(wrongGuess + 1)}></LettersToTry>
        </div>
    )

}

export default WordToGuess;