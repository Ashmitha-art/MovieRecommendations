/* WRITE YOUR PHOTO PATH HERE vvv */
import ashmitha_photo from './photos/ashmitha.jpg';
import steve_photo from './photos/steve.png';
import preet_photo from './photos/preet.jpg';
import chris_photo from './photos/chris.jpg';
import abdul_photo from './photos/abdul.jpg';
import nathan_photo from './photos/nathan.jpg';

import { useNavigate } from 'react-router-dom';

function About(){

    let navigate = useNavigate();

    const routeChange = (name) => {
        let path = '/' + name;
        navigate(path);
    }

    // List of all current members
    const members = ["Ashmitha Pais", "Steve Betts", "Preet Dhaliwal", "Chris Farnsworth", "Abdul Barrie", "Nathan Loo"];
    const member_photos = [ashmitha_photo, steve_photo, preet_photo, chris_photo, abdul_photo, nathan_photo];
    const routes = ["ashmitha", "steve", "preet", "chris", "abdul", "nathan"];

    // Create a member template for each member in the list above.
    return (
        <div>
            <h1 class="heading">CSC 648 - Software Engineering</h1>
            <h2 class="heading">Section 4</h2>
            <h3 class="heading">Team 02</h3>

            <div className='member-container'>
                {members.map((member, index) => (
                    <div class='member' onClick={() => {routeChange(routes[index])}}>
                        <img class='member-photo' src={member_photos[index]} alt={member}/>
                        <p class='member-title'>{member}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default About;