import React from "react";
import '../css/CategoryAndNumOfLettersToChoose.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorChange from './ColorChange.js';
import FullscreenButton from './FullscreenButton';

function CategoryAndNumOfLettersToChoose() {
    
    let btnBckgroundClass = localStorage.getItem('btnBckgroundClass');
    let bodyBckgroundClass = localStorage.getItem('bodyBckgroundClass');

    document.body.classList.add(bodyBckgroundClass);

    localStorage.removeItem('formData');
    
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const [gamersName, setGamersName] = useState("");
    
    const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    localStorage.setItem('formData', JSON.stringify(data));
        if(inputs.category !== undefined && inputs.level !== undefined) {
            navigate(`/game`);
        } else if(inputs.category === undefined && inputs.level !== undefined) {
            document.getElementById('errorMsg').innerText = 'Please, select a category!';
        } else if(inputs.category !== undefined && inputs.level === undefined) {
            document.getElementById('errorMsg').innerText = 'Please, select a level!';
        } else {
           document.getElementById('errorMsg').innerText = 'Please, select a category and a level!';
        }
    }

    return (
        <>
            <FullscreenButton />
            <h1>Feed the mouse - by guessing a word!</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your name:</label>
                <br></br>
                <input className={btnBckgroundClass} type="text" name="name" id="name" autoFocus autoComplete="off" value={gamersName}
          onChange={(e) => setGamersName(e.target.value)} />
                <br></br>
                <br></br>
                <label>Select a category:</label>
                <br></br>
                <select name="category" value={inputs.category || ""} className={btnBckgroundClass} onChange={handleChange}>
                    <option className={btnBckgroundClass} value="" disabled>Select a category</option>
                    <option className={btnBckgroundClass} value="entertainment">Entertainment</option>
                    <option className={btnBckgroundClass} value="nature">Nature</option>
                    <option className={btnBckgroundClass} value="society">Society</option>
                    <option className={btnBckgroundClass} value="mixed">Mixed</option>
                </select>
                <br></br>
                <br></br>
                <label>Select a level:</label>
                <br></br>
                <select className={btnBckgroundClass} name="level" value={inputs.level || ""} onChange={handleChange}>
                    <option className={btnBckgroundClass} value="" disabled>Select a level</option>
                    <option className={btnBckgroundClass} value="easy">Easy</option>
                    <option className={btnBckgroundClass} value="medium">Medium</option>
                    <option className={btnBckgroundClass} value="hard">Hard</option>
                </select>
                <br></br>
                <br></br>
                <button className={btnBckgroundClass} type="submit">Let's start!</button>
                <p id="errorMsg"></p>
            </form>
            <ColorChange />
        </>
    )

}

export default CategoryAndNumOfLettersToChoose;