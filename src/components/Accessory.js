import React from "react";
import '../css/Accessory.css';

const Accessory = () => {

    let accessorySrc;


    const month = new Date().getMonth(); // 0-alapú hónap (0: január, 1: február, ... 11: december)

    if (month >= 2 && month <= 4) {
        accessorySrc = 'images/flower.png';
    } else if (month >= 5 && month <= 7) {
        accessorySrc = 'images/sunglasses.png';
    } else if (month >= 8 && month <= 10) {
        accessorySrc = 'images/raincoat.png';
    } else {
        accessorySrc = 'images/scarf.png';
    }

    return (
        <img className="accessories" id="accessories" alt="accessories" src={accessorySrc} title="accessories"></img>
    );
};

export default Accessory;