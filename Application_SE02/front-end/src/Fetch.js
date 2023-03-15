import {useState, useEffect} from 'react';

function Fetch(url){

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const abortController = new AbortController();
        fetch(url, {signal: abortController.signal})
        .then(response => {
            if(!response.ok)
                throw Error("Could not fetch data.");
            
            return response.json();
        })
        .then(data => {
            setData(data);
        })
        .catch(error => {
            setError(error.message);
        })

        return () => abortController.abort();

    }, [url]);

    return {data, error};

}

export default Fetch;