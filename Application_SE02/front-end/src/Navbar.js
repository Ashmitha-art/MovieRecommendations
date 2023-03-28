import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef} from 'react';

function Navbar(){

    const [theme, setTheme] = useState('light');
    const [navbarTheme, setNavbarTheme] = useState('navbar-light');

    function toggleTheme(){
        if(theme === 'light'){
            setTheme('dark');
            setNavbarTheme('navbar-dark')
        } else {
            setTheme('light'); 
            setNavbarTheme('navbar-light');
        }
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
        <nav className={navbarTheme}>
            <button onClick={() => {routeChange('')}} className='navbar-button'>Home</button>
            <button onClick={() => {routeChange('about')}} className='navbar-button' id='about'>About</button>
            <button onClick={() => {routeChange('login')}} className='navbar-button' id='login'>Login</button>
            <button onClick={() => {routeChange('signup')}} className='navbar-button' id='signup'>Sign Up</button>

            <button onClick={ toggleTheme } className='navbar-button' id='theme-toggle'>Change Theme!</button>

        </nav>
    );
}

export default Navbar;