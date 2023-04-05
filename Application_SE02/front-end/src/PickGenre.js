import { useState } from 'react';

function PickGenre({element, setElement}){

    const [action, toggleAction] = useState(false);
    const [comedy, toggleComedy] = useState(false);
    const [drama, toggleDrama] = useState(false);
    const [horror, toggleHorror] = useState(false);
    const [romance, toggleRomance] = useState(false);
    const [thriller, toggleThriller] = useState(false);
    const [mystery, toggleMystery] = useState(false);
    const [crime, toggleCrime] = useState(false);
    const [animation, toggleAnimation] = useState(false);
    const [scifi, toggleScifi] = useState(false);
    const [fantasy, toggleFantasy] = useState(false);
    const [adventure, toggleAdventure] = useState(false);

    var genreLimit = 3;
    var [numGenres, setNumGenres] = useState(0);

    function handleClick(genre){

        switch(genre){
            case 'action':

                if(action){
                    setElement(element.filter((genre) => {return genre != 'action'}));
                    setNumGenres(numGenres - 1);
                    toggleAction(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'action']);
                        setNumGenres(numGenres + 1);
                        toggleAction(true);
                    }
                }
                
                break;

            case 'comedy':
                if(comedy){
                    setElement(element.filter(genre => genre != 'comedy'));
                    setNumGenres(numGenres - 1);
                    toggleComedy(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'comedy']);
                        setNumGenres(numGenres + 1);
                        toggleComedy(true);
                    }
                }

                break;

            case 'drama':
                if(drama){
                    setElement(element.filter(genre => genre != 'drama'));
                    setNumGenres(numGenres - 1);
                    toggleDrama(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'drama']);
                        setNumGenres(numGenres + 1);
                        toggleDrama(true);
                    }
                }

                break;
            case 'horror':
                if(horror){
                    setElement(element.filter(genre => genre != 'horror'));
                    setNumGenres(numGenres - 1);
                    toggleHorror(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'horror']);
                        setNumGenres(numGenres + 1);
                        toggleHorror(true);
                    }
                } 

                break;
            case 'romance':
                if(romance){
                    setElement(element.filter(genre => genre != 'romance'));
                    setNumGenres(numGenres - 1);
                    toggleRomance(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'romance']);
                        setNumGenres(numGenres + 1);
                        toggleRomance(true);
                    }
                } 

                break;
            case 'thriller':
                if(thriller){
                    setElement(element.filter(genre => genre != 'thriller'));
                    setNumGenres(numGenres - 1);
                    toggleThriller(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'thriller']);
                        setNumGenres(numGenres + 1);
                        toggleThriller(true);
                    }
                } 

                break;
            case 'mystery':
                if(mystery){
                    setElement(element.filter(genre => genre != 'mystery'));
                    setNumGenres(numGenres - 1);
                    toggleMystery(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'mystery']);
                        setNumGenres(numGenres + 1);
                        toggleMystery(true);
                    }
                } 

                break;
            case 'crime':
                if(crime){
                    setElement(element.filter(genre => genre != 'crime'));
                    setNumGenres(numGenres - 1);
                    toggleCrime(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'crime']);
                        setNumGenres(numGenres + 1);
                        toggleCrime(true);
                    }
                } 

                break;
            case 'animation':
                if(animation){
                    setElement(element.filter(genre => genre != 'animation'));
                    setNumGenres(numGenres - 1);
                    toggleAnimation(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'animation']);
                        setNumGenres(numGenres + 1);
                        toggleAnimation(true);
                    }
                } 
                break;
            case 'scifi':
                if(scifi){
                    setElement(element.filter(genre => genre != 'scifi'));
                    setNumGenres(numGenres - 1);
                    toggleScifi(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'scifi']);
                        setNumGenres(numGenres + 1);
                        toggleScifi(true);
                    }
                } 
                break;
            case 'fantasy':
                if(fantasy){
                    setElement(element.filter(genre => genre != 'fantasy'));
                    setNumGenres(numGenres - 1);
                    toggleFantasy(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'fantasy']);
                        setNumGenres(numGenres + 1);
                        toggleFantasy(true);
                    }
                } 
                break;
            case 'adventure':
                if(adventure){
                    setElement(element.filter(genre => genre != 'adventure'));
                    setNumGenres(numGenres - 1);
                    toggleAdventure(false);
                } else {
                    if(numGenres < genreLimit){
                        setElement(element => [...element, 'adventure']);
                        setNumGenres(numGenres + 1);
                        toggleAdventure(true);
                    }
                } 
                break;
        
        
        }
    }

    return (
        <div>
            <h2 className='home-page-picker-title'>1: Pick a genre</h2>
            <div className='genre-button-container'>

                <label className={`genre-button-${action ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('action')}}/>
                    <p className='genre-button-text'>Action</p>
                </label>

                <label className={`genre-button-${comedy ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('comedy')}}/>
                    <p className='genre-button-text'>Comedy</p>
                </label>

                <label className={`genre-button-${drama ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('drama')}}/>
                    <p className='genre-button-text'>Drama</p>
                </label>

                <label className={`genre-button-${horror ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('horror')}}/>
                    <p className='genre-button-text'>Horror</p>
                </label>

                <label className={`genre-button-${romance ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('romance')}}/>
                    <p className='genre-button-text'>Romance</p>
                </label>

                <label className={`genre-button-${thriller ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('thriller')}}/>
                    <p className='genre-button-text'>Thriller</p>
                </label>

                <label className={`genre-button-${mystery ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('mystery')}}/>
                    <p className='genre-button-text'>Mystery</p>
                </label>

                <label className={`genre-button-${crime ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('crime')}}/>
                    <p className='genre-button-text'>Crime</p>
                </label>

                <label className={`genre-button-${animation ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('animation')}}/>
                    <p className='genre-button-text'>Animation</p>
                </label>

                <label className={`genre-button-${scifi ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('scifi')}}/>
                    <p className='genre-button-text'>Sci Fi</p>
                </label>

                <label className={`genre-button-${fantasy ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('fantasy')}}/>
                    <p className='genre-button-text'>Fantasy</p>
                </label>

                <label className={`genre-button-${adventure ? 'on' : 'off'}`}>
                    <input className='genre-button-checkbox' type='checkbox' defaultChecked={action} onClick={() => {handleClick('adventure')}}/>
                    <p className='genre-button-text'>Adventure</p>
                </label>

            </div>
        </div>
    );
}

export default PickGenre;