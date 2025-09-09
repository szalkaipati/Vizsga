/*"use client";
import { useState } from 'react';
import './button.css';

import LoginSignup from '../logIn-SignUp/login-signup';
import { Link } from 'react-router-dom';

 
function LoginButton() {
    
     
    const [buttonText, setButtonText] = useState('bejelentkezés');
    const [profile, setprofile] = useState('kijelentkezés');
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen((prevIsOpen) => !prevIsOpen);
  
    const handleClick = () => {
        setButtonText(prevText => prevText === 'bejelentkezés' ? 'kijelentkezés' : 'bejelentkezés');
    };

    
    /*const LoggedIn = () => {
        setprofile(prevText => prevText === 'bejelentkezés' ? 'kijelentkezés' : 'bejelentkezés');
    };
    /*<div className="login"><a href="login">belépés</a></div>
    <div className="registration"> <a href="registration">Regisztráció</a></div>
    return (
        <>
            <div >
                <button id="login-button" 
                        onClick={() => {handleClick();openPopup(); }}> {buttonText}
                </button>
                {isOpen && <LoginSignup />} 
            </div>

            {buttonText === 'kijelentkezés' && ( 
                <div className="profile">
                    <img src="" alt="Profile" className="profile-img" />
                </div>
            )}
        </>
    );
}
 


function Button() {
    const [buttonText, setButtonText] = useState('');

    const handleClick = () => {
        setButtonText(prevText => prevText === '' ? '' : '');
    };
    /*<div className="login"><a href="login">belépés</a></div>
    <div className="registration"> <a href="registration">Regisztráció</a></div>
    return (
        <>
        <div>
            <button id="regular-button" onClick={handleClick}>{buttonText}</button>;
        </div>
       
        </>
    );
}
export {LoginButton, Button};*/


import { useState } from 'react';
import './button.css';
import LoginSignup from '../login-signup/login-signup';

function LoginButton() {
    const [buttonText, setButtonText] = useState('bejelentkezés');
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(!isOpen);

    const handleClick = () => {
        if (buttonText === 'bejelentkezés') {
            window.open('skhill/src/api/auth/signin', 'Sign In', 'width=500,height=600');//E:\2024_2025\Új mappa\git-skhill\skhill\src\app\api\auth
        } else {
            setButtonText('bejelentkezés');
        }
    };

    return (
        <>
            <button id="login-button" onClick={handleClick}>
                {buttonText}
            </button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <LoginSignup />
                        <button className="close-modal" onClick={openPopup}>Close</button>
                    </div>
                </div>
            )}

            {buttonText === 'kijelentkezés' && (
                <div className="profile">
                    <img src="" alt="Profile" className="profile-img" />
                </div>
            )}
        </>
    );
}

export { LoginButton };
