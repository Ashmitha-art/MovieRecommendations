import { useState } from 'react'
import Fetch from "./Fetch.js";
import VerticalSlice from './VerticalSlice.js';

function Home(){

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
            
            <VerticalSlice url='/api/users/' contents='users'/>
            <VerticalSlice url='/api/movies/' contents='movies'/>
            <VerticalSlice url='/api/usermovies/' contents='usermovies'/>
            <VerticalSlice url='/api/userrecs/' contents='userrecs'/>
            <VerticalSlice url='/api/genres/' contents='genres'/>
            <VerticalSlice url='/api/moviegenres/' contents='moviegenres'/>


        </div>
    );

}

export default Home;