import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';

function Navbar(){

    const [theme, setTheme] = useState('light');

    function toggleTheme(){
        if(theme === 'light')
            setTheme('dark');
        else
            setTheme('light');
    }

    useEffect(() => {
        document.body.className=theme;
    }, [theme]);


    let navigate = useNavigate();
    
    const routeChange = (route) => {
        let path = '/' + route;
        navigate(path);
    } 

    return (
        <nav className='navbar'>
            <button onClick={() => {routeChange('')}} className='navbar-button'>Home</button>
            <button onClick={() => {routeChange('about')}} className='navbar-button' id='about'>About</button>
            <button onClick={ toggleTheme} className='theme-toggle'>Change Theme!</button>

        </nav>
    );
}

export default Navbar;