import React from "react";
import '../css/Accessory.css';

const Accessory = () => {

    let accessorySrc;


    const month = new Date().getMonth();
    const day = new Date().getDate();

    if (month >= 2 && month <= 4) {
        accessorySrc = 'images/flower.png';
    } else if (month >= 5 && month <= 7) {
        accessorySrc = 'images/sunglasses.png';
    } else if (month >= 8 && month <= 10) {
        accessorySrc = 'images/raincoat.png';
    } else {
        accessorySrc = 'images/scarf.png';
    }

    const isChristmas = (month === 11 && day === 25);
    const isEaster = (month === 3 && day >= 22 && day <= 28);
    const isNewYear = (month === 0 && day === 1);
    const isHalloween = (month === 9 && day === 31);
    const isValentinesDay = (month === 1 && day === 14);

    if (isChristmas) {
        accessorySrc = 'images/santahat.png';
    } else if (isEaster) {
        accessorySrc = 'images/easteregg.png';
    } else if (isNewYear) {
        accessorySrc = 'images/balloon.png';
    } else if (isHalloween) {
        accessorySrc = 'images/pumpkin.png'; // Halloween tök
    } else if (isValentinesDay) {
        accessorySrc = 'images/valentine.png';
    }

    return (
        <img className="accessories" id="accessories" alt="accessories" src={accessorySrc} title="accessories"></img>
    );
};

export default Accessory;