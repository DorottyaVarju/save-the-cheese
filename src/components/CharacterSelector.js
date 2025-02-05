import React, { useState } from 'react';
import '../css/CharacterSelector.css';
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";
import Accessory from './Accessory.js';

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
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

    const handlePrev = () => {
        setCurrentCharacterIndex((prevIndex) => (prevIndex - 1 + characters.length) % characters.length);
    };

    const handleNext = () => {
        setCurrentCharacterIndex((prevIndex) => (prevIndex + 1) % characters.length);
    };

    return (
        <div className="characterSelectorDiv">
            <TiMediaPlayReverse className="arrows" style={{ color: color }} onClick={handlePrev} />
            <div id="mouseImgContainer">
                <img
                    className="character"
                    src={'images/' + characters[currentCharacterIndex]}
                    alt="character"
                />
                <Accessory></Accessory>
            </div>
            <TiMediaPlay className="arrows" style={{ color: color }} onClick={handleNext} />

            <input
                type="hidden"
                name="selectedCharacter"
                value={characters[currentCharacterIndex]}
            />

        </div>
    );
};


export default CharacterSelector;