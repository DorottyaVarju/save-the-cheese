import React, { useState } from 'react';
import '../css/CharacterSelector.css';
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";

const CharacterSelector = ({ characters }) => {
    let btnBckgroundClass = localStorage.getItem('btnBckgroundClass');
    let color;

    switch (btnBckgroundClass) {
        case 'pinkBtnBckground':
            color = '#8c3747';
            break;
        case 'blueBtnBckground':
            color = '#072ac8';
            break;
        case 'greenBtnBckground':
            color = '#1a5c3d';
            break;
        case 'purpleBtnBckground':
            color = '#480ca8';
            break;
        default:
            color = '#4f2c16';
    }
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
            <TiMediaPlayReverse className="arrows" style={{ color: color }} onClick={handlePrev} /> {/* Ez egy balra mutató nyíl */}
                {/* Jelenlegi karakter */}
                <img
                    className="character"
                    src={'images/' + characters[currentCharacterIndex]}
                    alt="character"
                />
            {/* Jobbra léptető gomb */}
            <TiMediaPlay className="arrows" style={{ color: color }} onClick={handleNext} /> {/* Ez egy jobbra mutató nyíl */}

            <input
                type="hidden"
                name="selectedCharacter"
                value={characters[currentCharacterIndex]}
            />

        </div>
    );
};


export default CharacterSelector;