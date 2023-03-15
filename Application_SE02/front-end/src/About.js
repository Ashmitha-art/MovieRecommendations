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
    const member_titles = ["Ashmitha Pais: Team Lead", "Steve Betts: Scrum Master", "Preet Dhaliwal: Github Master", "Chris Farnsworth: Back-End Lead", "Abdul Barrie: Front-End Lead", "Nathan Loo: Product Owner"];
    const member_photos = [ashmitha_photo, steve_photo, preet_photo, chris_photo, abdul_photo, nathan_photo];
    const routes = ["ashmitha", "steve", "preet", "chris", "abdul", "nathan"];

    // Create a member template for each member in the list above.
    return (
        <div>
            <h1 className="heading">CSC 648 - Software Engineering</h1>
            <h2 className="heading">Section 4</h2>
            <h3 className="heading">Team 02</h3>

            <div className='member-container'>
                {member_titles.map((member, index) => (
                    <div className='member' onClick={() => {routeChange(routes[index])}}>
                        <img className='member-photo' src={member_photos[index]} alt={member}/>
                        <p className='member-title'>{member}</p>
                    </div>
                ))}
            </div>
            
            <p className='weekly-schedule-title'><b>Weekly Schedule</b></p>
            <table className='weekly-schedule'>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                </tr>
                <tr>
                    <td> </td>
                    <td> </td>
                    <td>Group Meeting <br/> In class</td>
                    <td>Group Meeting <br/> 3:30 PM to 4:30 PM</td>
                    <td> </td>
                </tr>
            </table>

            <p className='weekly-schedule-title'><b>Study Plan</b></p>
            <table className='weekly-schedule'>
                <tr>
                    <th>Ashmitha</th>
                    <th>Steve</th>
                    <th>Preet</th>
                    <th>Chris</th>
                    <th>Abdul</th>
                    <th>Nathan</th>
                </tr>
                <tr>
                    <td>Amazon AWS</td>
                    <td>Django<br/>Python<br/>SQL</td>
                    <td>Django<br/>Python<br/>SQL</td>
                    <td>Django<br/>Python<br/>SQL<br/>Git<br/>Databases</td>
                    <td>React<br/>SQL</td>
                    <td>React<br/>SQL</td>
                </tr>
            </table>

        </div>

        

    );

}

export default About;