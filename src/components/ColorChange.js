import React from 'react';
import '../css/ColorChange.css';

const ColorChange = () => {

    const themeChange = (id) => {
        let buttons = document.getElementsByTagName('button');
        let selects = document.getElementsByTagName('select');
        let inputs = document.getElementsByTagName('input');
        let options = document.getElementsByTagName('option');
    
        let bodyBckgroundClass, btnBckgroundClass;

        switch (id) {
            case 'brownBtn':
                bodyBckgroundClass = 'brownBodyBckground';
                btnBckgroundClass = 'brownBtnBckground';
                break;
            case 'pinkBtn':
                bodyBckgroundClass = 'pinkBodyBckground';
                btnBckgroundClass = 'pinkBtnBckground';
                break;
            case 'blueBtn':
                bodyBckgroundClass = 'blueBodyBckground';
                btnBckgroundClass = 'blueBtnBckground';
                break;
            case 'greenBtn':
                bodyBckgroundClass = 'greenBodyBckground';
                btnBckgroundClass = 'greenBtnBckground';
                break;
            case 'purpleBtn':
                bodyBckgroundClass = 'purpleBodyBckground';
                btnBckgroundClass = 'purpleBtnBckground';
                break;
            default: 
                bodyBckgroundClass = 'brownBodyBckground';
                btnBckgroundClass = 'brownBtnBckground';
                break;
        }

        document.body.removeAttribute('class');
        document.body.classList.add(bodyBckgroundClass);

        for (let i = 0; i < buttons.length; i++) {
            let isChildOfColorChangeDiv = document.getElementById('colorChange').contains(buttons[i]);
    
            if (!isChildOfColorChangeDiv) {
                buttons[i].classList.remove('brownBtnBckground');
                buttons[i].classList.remove('pinkBtnBckground');
                buttons[i].classList.remove('blueBtnBckground');
                buttons[i].classList.remove('greenBtnBckground');
                buttons[i].classList.remove('purpleBtnBckground');
                buttons[i].classList.add(btnBckgroundClass);
            }
        }
    
        for (let i = 0; i < selects.length; i++) {
            selects[i].classList.remove('brownBtnBckground');
            selects[i].classList.remove('pinkBtnBckground');
            selects[i].classList.remove('blueBtnBckground');
            selects[i].classList.remove('greenBtnBckground');
            selects[i].classList.remove('purpleBtnBckground');
            selects[i].classList.add(btnBckgroundClass);
        }
    
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('brownBtnBckground');
            inputs[i].classList.remove('pinkBtnBckground');
            inputs[i].classList.remove('blueBtnBckground');
            inputs[i].classList.remove('greenBtnBckground');
            inputs[i].classList.remove('purpleBtnBckground');
            inputs[i].classList.add(btnBckgroundClass);
        }
    
        for (let i = 0; i < options.length; i++) {
            options[i].classList.remove('brownBtnBckground');
            options[i].classList.remove('pinkBtnBckground');
            options[i].classList.remove('blueBtnBckground');
            options[i].classList.remove('greenBtnBckground');
            options[i].classList.remove('purpleBtnBckground');
            options[i].classList.add(btnBckgroundClass);
        }

        localStorage.setItem('btnBckgroundClass', btnBckgroundClass);
        localStorage.setItem('bodyBckgroundClass', bodyBckgroundClass);
    };
    

  return (
    <div id="colorChange">
        <button id="brownBtn" onClick={() => themeChange("brownBtn")}></button>
        <button id="pinkBtn" onClick={() => themeChange("pinkBtn")}></button>
        <button id="blueBtn" onClick={() => themeChange("blueBtn")}></button>
        <button id="greenBtn" onClick={() => themeChange("greenBtn")}></button>
        <button id="purpleBtn" onClick={() => themeChange("purpleBtn")}></button>
    </div>
  );
};

export default ColorChange;
