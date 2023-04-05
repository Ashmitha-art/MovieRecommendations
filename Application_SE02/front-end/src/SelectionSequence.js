import { useState } from 'react';
import SelectGenre from './SelectGenre';
import SelectYear from './SelectYear';
import SelectRuntime from './SelectRuntime';
import SelectAge from './SelectAge';



function SelectionSequence(){

    const [current, setCurrent] = useState('genre');
    const [next, toggleNext] = useState(false);

    const [genre, setGenre] = useState([]);
    const [year, setYear] = useState('');
    const [runtime, setRuntime] = useState('');
    const [age, setAge] = useState(''); 

    return (
        <div>
            { (current === 'genre') && <SelectGenre element={genre} setElement={setGenre}/>}

            <p>{ genre }</p>

            { (next || genre.length != 0) && <button>Next</button>}

        </div>
        
    );

}

export default SelectionSequence;