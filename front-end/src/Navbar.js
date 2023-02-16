import { useNavigate } from 'react-router-dom';

function Navbar(){

    let navigate = useNavigate();
    
    const routeChange = (route) => {
        let path = '/' + route;
        navigate(path);
    } 

    return (
        <nav class='navbar'>
            <button onClick={() => {routeChange('')}} class='navbar-button'>Home</button>
            <button onClick={() => {routeChange('')}} class='navbar-button'>About</button>
        </nav>
    );
}

export default Navbar;