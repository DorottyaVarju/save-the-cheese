import React, { useEffect, useState } from "react";
import '../css/LettersToTry.css';

function LettersToTry(props) {
    const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const { wrongGuessLimit, word, goodGuess, onGoodLetter, wrongGuess, onWrongLetter, uniqueLettersSize } = props;
    const letterAboveLine = document.getElementsByClassName('letterAboveLine');
    const [usedKeys, setUsedKeys] = useState([]);

    const handleKeyUp = (event) => {
        const letter = event.key.toUpperCase();
        if (abc.includes(letter) && !usedKeys.includes(letter)) {
            setUsedKeys(prevKeys => [...prevKeys, letter]);
            isThisLetterInTheWord(letter);
        }
    };

    useEffect(() => {
        if(wrongGuess >= wrongGuessLimit || goodGuess >= word.length){
            document.removeEventListener('keyup', handleKeyUp);
        } else {
            document.addEventListener('keyup', handleKeyUp);

            return () => {
                document.removeEventListener('keyup', handleKeyUp);
            };
        }
    }, [word, goodGuess, onGoodLetter, wrongGuess, onWrongLetter, usedKeys]);

    const handleClick = (item) => () => {
        isThisLetterInTheWord(item);
    };

    const elementsToReturn = abc.map((item, index) => (
        <button
            type="button"
            id={item}
            className="letters"
            key={index}
            tabIndex="0"
            onClick={handleClick(item)}
        >
            {item}
        </button>
    ));

    const unTriedLetter = () => {
        if (document.getElementById('congratText')) {
            setTimeout(() => {
                document.getElementById('congratText').classList.add('visible');
            }, 1000);  // 1000 ms = 1 másodperc
        }
        document.getElementById('mark').style.opacity = 1;
        Array.from(document.getElementsByClassName('letters')).forEach((letter) => {
            letter.classList.add('untriedLetter');
        });
        setUsedKeys([]);
    };   

    function isThisLetterInTheWord(letterOfAbc) {
        let letterFound = false;
        let letterOfAbcElement = document.getElementById(letterOfAbc);

        Array.from(word).forEach((letterOfWord, indexOfWord) => {
            if (letterOfWord === letterOfAbc) {
                letterFound = true;
                Array.from(letterAboveLine).forEach((line, indexOfLine) => {
                    if (indexOfLine === indexOfWord) {
                        line.innerText = letterOfWord;
                        if (!letterOfAbcElement.classList.contains('alreadyInWordLetter')) {
                            letterOfAbcElement.classList.add('alreadyInWordLetter');
                        }
                    }
                });

                if (document.querySelectorAll('.alreadyInWordLetter').length === word.length) {
                    unTriedLetter();
                } else {
                    const indexes = [];
                    Array.from(document.querySelectorAll('.alreadyInWordLetter')).forEach((charElement) => {
                        const char = charElement.textContent;
                        let index = -1;
                        do {
                            index = word.indexOf(char, index + 1);
                            if (index !== -1) {
                                indexes.push(index);
                            }
                        } while (index !== -1);
                    });

                    if (indexes.length === word.length) {
                        unTriedLetter();
                    }
                }
            }
        });

        if (letterFound && onGoodLetter) {
            onGoodLetter();
        } else {
            if (goodGuess >= word.length) {
                unTriedLetter();
                document.removeEventListener('keyup', handleKeyUp);
                Array.from(word).forEach((letterOfWord, indexOfWord) => {
                    Array.from(letterAboveLine).forEach((line, indexOfLine) => {
                        if (indexOfLine === indexOfWord) {
                            line.innerText = letterOfWord;
                        }
                    });
                });
            } else {
                onWrongLetter();
                letterOfAbcElement.classList.add('wrongLetterGuess');
                if(wrongGuess+1 >= wrongGuessLimit){
                    unTriedLetter();
                    document.removeEventListener('keyup', handleKeyUp);
                    Array.from(word).forEach((letterOfWord, indexOfWord) => {
                        Array.from(letterAboveLine).forEach((line, indexOfLine) => {
                            if (indexOfLine === indexOfWord) {
                                line.innerText = letterOfWord;
                            }
                        });
                    });
                }
            }
        }
    }

    return <div id="elementsToReturn">{elementsToReturn}</div>;
}

export default LettersToTry;
