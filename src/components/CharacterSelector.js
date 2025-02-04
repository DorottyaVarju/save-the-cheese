import React, { useState } from 'react';
import '../css/CharacterSelector.css';
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";

const CharacterSelector = ({ characters }) => {
    // Állapot tárolása, hogy melyik karaktert mutassuk
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

    // Kattintásra balra és jobbra léptethetjük a karaktereket
    const handlePrev = () => {
        setCurrentCharacterIndex((prevIndex) => (prevIndex - 1 + characters.length) % characters.length);
    };

    const handleNext = () => {
        setCurrentCharacterIndex((prevIndex) => (prevIndex + 1) % characters.length);
    };

    return (
        <div className="characterSelectorDiv">
            {/* Balra léptető gomb */}
            <button className="leftBtn" onClick={handlePrev}>
                <TiMediaPlayReverse /> {/* Ez egy balra mutató nyíl */}
            </button>

            {/* Jelenlegi karakter */}
            <img
                className="character"
                src={'images/' + characters[currentCharacterIndex]}
                alt="character"
            />

            {/* Jobbra léptető gomb */}
            <button className="rightBtn" onClick={handleNext}>
                <TiMediaPlay /> {/* Ez egy jobbra mutató nyíl */}
            </button>

            <input
                type="hidden"
                name="selectedCharacter"
                value={characters[currentCharacterIndex]}
            />
            
        </div>
    );
};


export default CharacterSelector;