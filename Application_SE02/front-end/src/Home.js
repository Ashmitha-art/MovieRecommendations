import { useState } from 'react'
import PickGenre from './PickGenre';

function Home(){

    const [genre, setGenre] = useState([]);
    const [year, setYear] = useState('');
    const [runtime, setRuntime] = useState('');
    const [age, setAge] = useState(''); 

    return(
        <div>
            <h1 className='heading'>Welcome to MovAI</h1>

            <PickGenre element={genre} setElement={setGenre}/> 

            <p>{ genre }</p>
            

        </div>
    );

}

export default Home;