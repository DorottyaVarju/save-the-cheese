import React, { useRef, useState } from "react";
import Select from 'react-select';
import '../css/CategoryAndNumOfLettersToChoose.css';
import { useNavigate } from 'react-router-dom';
import ColorChange from './ColorChange.js';
import FullscreenButton from './FullscreenButton';

function CategoryAndNumOfLettersToChoose() {
    const selectRef = useRef(null);
    let btnBckgroundClass = localStorage.getItem('btnBckgroundClass');
    let bodyBckgroundClass = localStorage.getItem('bodyBckgroundClass');

    document.body.classList.add(bodyBckgroundClass);

    let bgColor;

    switch (btnBckgroundClass) {
        case 'pinkBtnBckground':
            bgColor = '#8c3747';
            break;
        case 'blueBtnBckground':
            bgColor = '#072ac8';
            break;
        case 'greenBtnBckground':
            bgColor = '#1a5c3d';
            break;
        case 'purpleBtnBckground':
            bgColor = '#480ca8';
            break;
        default:
            bgColor = '#844923ff';
    }

    localStorage.removeItem('formData');

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (selectedOption) => {
        const name = selectedOption.name;
        const value = selectedOption.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const [gamersName, setGamersName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        localStorage.setItem('formData', JSON.stringify(data));
        if (inputs.category !== undefined && inputs.level !== undefined) {
            navigate(`/game`);
        } else if (inputs.category === undefined && inputs.level !== undefined) {
            document.getElementById('errorMsg').innerText = 'Please, select a category!';
        } else if (inputs.category !== undefined && inputs.level === undefined) {
            document.getElementById('errorMsg').innerText = 'Please, select a level!';
        } else {
            document.getElementById('errorMsg').innerText = 'Please, select a category and a level!';
        }
    };

    const categoryOptions = [
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'nature', label: 'Nature' },
        { value: 'society', label: 'Society' },
        { value: 'mixed', label: 'Mixed' },
    ];

    const levelOptions = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
    ];

    const handleMenuOpen = () => {
        setTimeout(() => {
            const optionsContainer = document.body.querySelector('.react-select__menu');
            if (optionsContainer) {
                let bgClassName = (((document.getElementsByClassName('selectContainer')[0].className).split(' '))[1]).slice(0, -9);
                const allOptions = optionsContainer.querySelectorAll('.react-select__option');
                switch (bgClassName) {
                    case 'pinkBtnBckground':
                        bgColor = '#8c3747';
                        break;
                    case 'blueBtnBckground':
                        bgColor = '#072ac8';
                        break;
                    case 'greenBtnBckground':
                        bgColor = '#1a5c3d';
                        break;
                    case 'purpleBtnBckground':
                        bgColor = '#480ca8';
                        break;
                    default:
                        bgColor = '#844923ff';
                }
                allOptions.forEach(option => {
                    option.style.backgroundColor = bgColor;
                    option.style.color = '#fff88bff';
                    option.onmouseover = () => {
                        option.style.backgroundColor = '#fff88bff';
                        option.style.color = '#844923ff';
                    };
                    option.onmouseout = () => {
                        option.style.backgroundColor = bgColor;
                        option.style.color = '#fff88bff';
                    };
                });
            }
        }, 0);
    };


    return (
        <>
            <FullscreenButton />
            <h1>Feed the mouse - by guessing a word!</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your name:</label>
                <br />
                <input className={btnBckgroundClass} type="text" name="name" id="name" autoFocus autoComplete="off" value={gamersName}
                    onChange={(e) => setGamersName(e.target.value)} />
                <br /><br />

                <label>Select a category:</label>
                <br />
                <div className={"selectContainer " + btnBckgroundClass + "ForSelect"}>
                    <Select
                        name="category"
                        ref={selectRef}
                        classNamePrefix="react-select"
                        options={categoryOptions}
                        onMenuOpen={handleMenuOpen}
                        onChange={(option) => handleChange({ ...option, name: 'category' })}
                        isSearchable={false}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                height: '50px',
                                width: '17rem',
                                padding: '10px 30px',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: bgColor,
                                cursor: 'pointer',
                                color: '#fff88bff',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                outline: 'none',
                                marginTop: '8px',
                                minWidth: '264px',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                                '&:focus': {
                                    boxShadow: 'none',
                                },
                                display: 'flex',
                                justifyContent: 'center',
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                height: '50px',
                                color: '#fff88bff',
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: '#ffdd57',
                                height: '50px',
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                color: '#ffdd57',
                                '&:hover': {
                                    color: '#fff88bff',
                                },
                                alignSelf: 'start',
                            }),
                            menu: (provided, state) => ({
                                ...provided,
                                width: '17rem',
                                backgroundColor: bgColor,
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? '#fff88bff' : bgColor,
                                color: state.isFocused ? '#844923ff' : '#fff88bff',
                            }),
                            indicatorSeparator: (provided) => ({
                                ...provided,
                                display: 'none',
                            }),
                        }}
                        placeholder="Select a category"
                    />
                </div>
                <br /><br />

                <label>Select a level:</label>
                <br />
                <div className={"selectContainer " + btnBckgroundClass + "ForSelect"}>
                    <Select
                        name="level"
                        ref={selectRef}
                        classNamePrefix="react-select"
                        options={levelOptions}
                        onMenuOpen={handleMenuOpen}
                        onChange={(option) => handleChange({ ...option, name: 'level' })}
                        isSearchable={false}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                height: '50px',
                                width: '17rem',
                                padding: '10px 30px',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: bgColor,
                                cursor: 'pointer',
                                color: '#fff88bff',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                outline: 'none',
                                marginTop: '8px',
                                minWidth: '264px',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                                '&:focus': {
                                    boxShadow: 'none',
                                },
                                display: 'flex',
                                justifyContent: 'center',
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                height: '50px',
                                color: '#fff88bff',
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: '#ffdd57',
                                height: '50px',
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                color: '#ffdd57',
                                '&:hover': {
                                    color: '#fff88bff',
                                },
                                alignSelf: 'start',
                            }),
                            menu: (provided, state) => ({
                                ...provided,
                                width: '17rem',
                                backgroundColor: bgColor,
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? '#fff88bff' : bgColor,
                                color: state.isFocused ? '#844923ff' : '#fff88bff',
                            }),
                            indicatorSeparator: (provided) => ({
                                ...provided,
                                display: 'none',
                            }),
                        }}
                        placeholder="Select a level"
                    />
                </div>
                <br /><br />

                <button className={btnBckgroundClass} type="submit">Let's start!</button>
                <p id="errorMsg"></p>
            </form>
            <ColorChange />
        </>
    );
}

export default CategoryAndNumOfLettersToChoose;