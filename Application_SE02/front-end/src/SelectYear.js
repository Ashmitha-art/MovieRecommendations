import { useState } from 'react';

function SelectYear({setElement}){

    const [prehistoric, togglePrehistoric] = useState(false);   // 1920 to 1940
    const [vintage, toggleVintage] = useState(false);           // 1940 to 1960
    const [classic, toggleClassic] = useState(false);           // 1960 to 1980
    const [retro, toggleRetro] = useState(false)                // 1980 to 2000
    const [recent, toggleRecent] = useState(false);             // 2000 to 2021

    // replace with better code later
    function handleClick(year){
        switch(year){
            case 'prehistoric':
                togglePrehistoric(true);
                toggleVintage(false);
                toggleClassic(false);
                toggleRetro(false);
                toggleRecent(false);
                setElement('prehistoric');
                break;
            case 'vintage':
                togglePrehistoric(false);
                toggleVintage(true);
                toggleClassic(false);
                toggleRetro(false);
                toggleRecent(false);
                setElement('vintage');
                break;
            case 'classic':
                togglePrehistoric(false);
                toggleVintage(false);
                toggleClassic(true);
                toggleRetro(false);
                toggleRecent(false);
                setElement('classic');
                break;
            case 'retro':
                togglePrehistoric(false);
                toggleVintage(false);
                toggleClassic(false);
                toggleRetro(true);
                toggleRecent(false);
                setElement('retro');
                break;
            case 'recent':
                togglePrehistoric(false);
                toggleVintage(false);
                toggleClassic(false);
                toggleRetro(false);
                toggleRecent(true);
                setElement('recent');
                break;
        }
    }


    return (
        <div>
            <h2 className='home-page-picker-title'>2: Pick a year range</h2>
            <div className='year-button-container'>
                <label className={`year-button-${prehistoric ? 'on' : 'off'}`}>
                    <input className='year-button-checkbox' type='checkbox' defaultChecked={prehistoric} onClick={() => {handleClick('prehistoric')}}/>
                    <p className='year-button-text'>Prehistoric!<br/>1920 to 1940</p>
                </label>
                <label className={`year-button-${vintage ? 'on' : 'off'}`}>
                    <input className='year-button-checkbox' type='checkbox' defaultChecked={vintage} onClick={() => {handleClick('vintage')}}/>
                    <p className='year-button-text'>Vintage!<br/>1940 to 1960</p>
                </label>
                <label className={`year-button-${classic ? 'on' : 'off'}`}>
                    <input className='year-button-checkbox' type='checkbox' defaultChecked={classic} onClick={() => {handleClick('classic')}}/>
                    <p className='year-button-text'>Classic!<br/>1960 to 1980</p>
                </label>
                <label className={`year-button-${retro ? 'on' : 'off'}`}> 
                    <input className='year-button-checkbox' type='checkbox' defaultChecked={retro} onClick={() => {handleClick('retro')}}/>
                    <p className='year-button-text'>Retro!<br/>1980 to 2000</p>
                </label>
                <label className={`year-button-${recent ? 'on' : 'off'}`}>
                    <input className='year-button-checkbox' type='checkbox' defaultChecked={recent} onClick={() => {handleClick('recent')}}/>
                    <p className='year-button-text'>Recent!<br/>2000 to Now</p>
                </label>
                
                
            </div>

        </div>
    );
}

export default SelectYear;