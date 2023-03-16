import { useState } from 'react'
import Fetch from "./Fetch.js";

function Home(){

    const {data, error} = Fetch("test");
    const [query, setQuery] = useState('');

    return(
        <div>
            <h1 className='heading'>This is the home page!</h1>
            
            <div className='home-page-search'>
                <input 
                    className="home-page-search-input"
                    type="text" 
                    placeholder="Search" 
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='home-page-submit'>Submit</button>
            </div>

            <div className='test-query'>{query}</div>
            
            { data && <div className='data'>{ data }</div>}
            { error && <div className='error'>Error: "{ error }"<br/>Couldn't fetch data!</div>}
        </div>
    );

}

export default Home;