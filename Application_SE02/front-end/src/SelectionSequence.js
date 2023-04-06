import { useState } from 'react';
import SelectGenre from './SelectGenre';
import SelectYear from './SelectYear';
import SelectRuntime from './SelectRuntime';
import SelectAge from './SelectAge';



function SelectionSequence(){

    const [current, setCurrent] = useState('genre');

    const [genre, setGenre] = useState([]);
    const [year, setYear] = useState('');
    const [runtime, setRuntime] = useState('');
    const [age, setAge] = useState(''); 

    return (
        <div>
            { (current === 'genre') && <SelectGenre element={genre} setElement={setGenre}/>}
            { (current === 'year') && <SelectYear setElement={setYear}/>}            

            { (genre.length != 0) && (current ==='genre') && <button className='next-button' onClick={()=>{setCurrent('year')}}>Next</button>}
            { (year != '') && (current ==='year') && <button className='next-button' onClick={()=>{setCurrent('runtime')}}>Next</button>}

            <p className='test'>{ genre }</p>
            <p className='test'>{ year }</p>


        </div>
        
    );

}

export default SelectionSequence;