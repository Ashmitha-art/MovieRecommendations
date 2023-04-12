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
            <h2 className="heading">Section 4 | Team 2</h2>

            <div className='member-container'>
                {member_titles.map((member, index) => (
                    <div key={member} className='member' onClick={() => {routeChange(routes[index])}}>
                        <img className='member-photo' src={member_photos[index]} alt={member}/>
                        <p className='member-title'>{member}</p>
                    </div>
                ))}
            </div>
            
            <p className='weekly-schedule-title'><b>Weekly Schedule</b></p>
            <table className='weekly-schedule'>
                <tbody>
                    <tr>
                        <th className='weekly-schedule_entry-heading'>Monday</th>
                        <th className='weekly-schedule_entry-heading'>Tuesday</th>
                        <th className='weekly-schedule_entry-heading'>Wednesday</th>
                        <th className='weekly-schedule_entry-heading'>Thursday</th>
                        <th className='weekly-schedule_entry-heading'>Friday</th>
                    </tr>
                    <tr>
                        <td className='weekly-schedule_entry'> </td>
                        <td className='weekly-schedule_entry'> </td>
                        <td className='weekly-schedule_entry'>Group Meeting <br/> In class</td>
                        <td className='weekly-schedule_entry'>Group Meeting <br/> 3:30 PM to 4:30 PM</td>
                        <td className='weekly-schedule_entry'> </td>
                    </tr>
                </tbody>
            </table>

            <p className='weekly-schedule-title'><b>Study Plan</b></p>
            <table className='weekly-schedule'>
                <tbody>
                    <tr>
                        <th className='weekly-schedule_entry-heading'>Ashmitha</th>
                        <th className='weekly-schedule_entry-heading'>Steve</th>
                        <th className='weekly-schedule_entry-heading'>Preet</th>
                        <th className='weekly-schedule_entry-heading'>Chris</th>
                        <th className='weekly-schedule_entry-heading'>Abdul</th>
                        <th className='weekly-schedule_entry-heading'>Nathan</th>
                    </tr>
                    <tr>
                        <td className='weekly-schedule_entry'>Amazon AWS</td>
                        <td className='weekly-schedule_entry'>Django<br/>Python</td>
                        <td className='weekly-schedule_entry'>Django<br/>Python<br/>Git</td>
                        <td className='weekly-schedule_entry'>Django<br/>Python<br/>SQL<br/>Databases</td>
                        <td className='weekly-schedule_entry'>React<br/>Javascript</td>
                        <td className='weekly-schedule_entry'>React<br/>Javascript</td>
                    </tr>
                </tbody>
            </table>

        </div>

        

    );

}

export default About;