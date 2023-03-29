import { useState } from 'react'
import VerticalSlice from './VerticalSlice.js';

function Home(){

    return(
        <div>
            <h1 className='heading'>This is the home page!</h1>
            
            <VerticalSlice url='/api/movies/' contents='movies'/>
            <VerticalSlice url='/api/users/' contents='users'/>
            <VerticalSlice url='/api/usermovies/' contents='usermovies'/>
            <VerticalSlice url='/api/userrecs/' contents='userrecs'/>
            <VerticalSlice url='/api/genres/' contents='genres'/>
            <VerticalSlice url='/api/moviegenres/' contents='moviegenres'/>

        </div>
    );

}

export default Home;