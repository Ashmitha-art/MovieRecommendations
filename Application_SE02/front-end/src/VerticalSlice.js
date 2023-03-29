import Fetch from "./Fetch.js";
import {useEffect, useState } from 'react';

function VerticalSlice({url, contents}){

    const {data, error} = Fetch(url);

    const [filteredData, setFilteredData] = useState(data);

    function handleSearch(e){
        let val = e.target.value;
        let result = [];
        result = data.filter((d) => {
            return d.title.search(val) != -1;
        });
        setFilteredData(result);
    }

    // This is bad but it's a vertical slice so it's going to be removed at some point anyways.
    switch(contents){
        case 'movies':

            return (
                <div className='vertical-slice'>
                    <h2>MOVIES</h2>

                    <div className='home-page-search'>
                        <input
                            className='home-page-search-input'
                            type='text'
                            placeholder="Search" 
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>

                    {filteredData && filteredData.map((data) => (
                        <div className='movies-table' key={data.id}>
                            <p>Movie ID: { data.id }, Movie Title: { data.title }, Alt Title: { data.alt_title }, Year: { data.year }, Runtime: { data.runtime } </p>
                        </div>
                    ))}
                    { error && <div>{ error }</div>}
                </div>
            );

            break;

        case 'users':

            return (
                <div className='vertical-slice'>
                    <h2>USERS</h2>

                    {data && data.map((data) => (
                        <div className='user-table' key={data.id}>
                            <p>User ID: { data.id }, Username: { data.username }, Email: { data.email } </p>
                        </div>
                    ))}
                    { error && <div>{ error }</div>}
                </div>
            );
            break;  // break just in case?

        case 'usermovies':

            return (
                <div className='vertical-slice'>
                    <h2>USER MOVIES</h2>
                    {data && data.map((data) => (
                        <div className='user_movies-table' key={data.id}>
                            <p>ID: { data.id }, Movie ID: { data.movie_id }, User_ID: { data.user_id }, Rating: { data.rating } </p>
                        </div>
                    ))}
                    { error && <div>{ error }</div>}
                </div>
            );

            break;
        case 'userrecs':

            return (
                <div className='vertical-slice'>
                    <h2>USER RECOMMENDATIONS</h2>
                    {data && data.map((data) => (
                        <div className='user_recs-table' key={data.id}>
                            <p>ID: { data.id }, Movie ID: { data.movie_id }, User_ID: { data.user_id } </p>
                        </div>
                    ))}
                    { error && <div>{ error }</div>}
                </div>
            );
            break;
        case 'genres':

            return (
                <div className='vertical-slice'>
                    <h2>GENRES</h2>
                    {data && data.map((data) => (
                        <div className='genre-table' key={data.id}>
                            <p>ID: { data.id }, Genre: { data.genre } </p>
                        </div>
                    ))}
                    { error && <div>{ error }</div>}
                </div>
            );
            break;
        case 'moviegenres':

            return (
                <div className='vertical-slice'>
                    <h2>MOVIE GENRES</h2>
                    {data && data.map((data) => (
                        <div className='movie_genre-table' key={data.id}>
                            <p>ID: { data.id }, Movie ID: { data.movie_id }, Genre ID: { data.genre_id } </p>
                        </div>
                    ))}
                    { error && <div>{ error }</div>}
                </div>
            );
            break;
            
    }

    return (
        <div className='vertical-slice'>
            <p>Something bad happened. Content variable not defined.</p>
        </div>
    );

}

export default VerticalSlice;