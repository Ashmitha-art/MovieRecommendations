import { useState } from 'react';

function SelectGenre({element, setElement}){

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

        function removeGenre(x){
            setElement(element.filter((genre)=>{return genre != x}))
            setNumGenres(numGenres - 1);
        }

        function addGenre(x){
            setElement(element => [...element, x]);
            setNumGenres(numGenres + 1);
        }

        switch(genre){
            case 'action':

                if(action){
                    removeGenre('action');
                    toggleAction(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('action');
                        toggleAction(true);
                    }
                }
                
                break;

            case 'comedy':
                if(comedy){
                    removeGenre('comedy');
                    toggleComedy(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('comedy');
                        toggleComedy(true);
                    }
                }

                break;

            case 'drama':
                if(drama){
                    removeGenre('drama');
                    toggleDrama(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('drama');
                        toggleDrama(true);
                    }
                }

                break;
            case 'horror':
                if(horror){
                    removeGenre('horror');
                    toggleHorror(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('horror');
                        toggleHorror(true);
                    }
                } 

                break;
            case 'romance':
                if(romance){
                    removeGenre('romance');
                    toggleRomance(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('romance');
                        toggleRomance(true);
                    }
                } 

                break;
            case 'thriller':
                if(thriller){
                    removeGenre('thriller');
                    toggleThriller(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('thriller');
                        toggleThriller(true);
                    }
                } 

                break;
            case 'mystery':
                if(mystery){
                    removeGenre('mystery');
                    toggleMystery(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('mystery');
                        toggleMystery(true);
                    }
                } 

                break;
            case 'crime':
                if(crime){
                    removeGenre('crime');
                    toggleCrime(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('crime');
                        toggleCrime(true);
                    }
                } 

                break;
            case 'animation':
                if(animation){
                    removeGenre('animation');
                    toggleAnimation(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('animation');
                        toggleAnimation(true);
                    }
                } 
                break;
            case 'scifi':
                if(scifi){
                    removeGenre('scifi');
                    toggleScifi(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('scifi');
                        toggleScifi(true);
                    }
                } 
                break;
            case 'fantasy':
                if(fantasy){
                    removeGenre('fantasy');
                    toggleFantasy(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('fantasy');
                        toggleFantasy(true);
                    }
                } 
                break;
            case 'adventure':
                if(adventure){
                    removeGenre('adventure');
                    toggleAdventure(false);
                } else {
                    if(numGenres < genreLimit){
                        addGenre('adventure');
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

export default SelectGenre;