import { useState } from 'react';
import SelectGenre from './select_genre';
import SelectYear from './select_year';
import SelectRuntime from './select_runtime';
import SelectAge from './select_age';

function SelectionSequence(){

    const [current, set_current] = useState('genre');

    const [genre, set_genre] = useState([]);
    const [year, set_year] = useState([]);
    const [runtime, set_runtime] = useState([]);
    const [age, set_age] = useState([]); 

    return (
        <div>
            { (current === 'genre') && <SelectGenre element={genre} set_element={set_genre}/>}
            { (current === 'year') && <SelectYear element={year} set_element={set_year}/>}     
            { (current === 'runtime') && <SelectRuntime element={runtime} set_element={set_runtime}/>}   
            { (current === 'age') && <SelectAge element={age} set_element={set_age}/>}         

            { (genre.length != 0) && (current ==='genre') && <button className='next-button' onClick={()=>{set_current('year')}}>Next</button>}
            { (year.length != 0) && (current ==='year') && <button className='next-button' onClick={()=>{set_current('runtime')}}>Next</button>}
            { (runtime.length != 0) && (current ==='runtime') && <button className='next-button' onClick={()=>{set_current('age')}}>Next</button>}
            { (age.length != 0) && (current ==='age') && <button className='next-button' onClick={()=>{set_current('results')}}>Next</button>}

            <p className='test'>{ genre }</p>
            <p className='test'>{ year }</p>
            <p className='test'>{ runtime }</p>
            <p className='test'>{ age }</p>

        </div>
        
    );

}

export default SelectionSequence;