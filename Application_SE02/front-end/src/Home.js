import Fetch from "./Fetch.js";

function Home(){

    const {data, error} = Fetch("test");

    return(
        <div>
            <h1 className='heading'>This is the home page!</h1>
            { data && <div className='data'>{ data }</div>}
            { error && <div className='error'>Error: { error }<br/>Couldn't fetch data!</div>}
        </div>
    );

}

export default Home;