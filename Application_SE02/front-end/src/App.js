/* WRITE YOUR PHOTO PATH HERE vvv */
import ashmitha_photo from './photos/ashmitha.jpg';
import steve_photo from './photos/steve.png';
import preet_photo from './photos/preet.jpg';
import chris_photo from './photos/chris.jpg';
import abdul_photo from './photos/abdul.jpg';
import nathan_photo from './photos/nathan.jpg';

import Navbar from './Navbar.js';
import About from './About.js';
import Member from './Member.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    let ashmitha_text = "I am Ashmitha Dale Pais, a computer science graduate with a Bachelor's degree from The Oxford College of Engineering in Bangalore, India. Currently, I am pursuing a Master's degree in Computer Science at San Francisco State University. In terms of my academic projects, I have worked on a Blood and Organ Donation Management System using HTML, CSS, PL/SQL, and Apache Tomcat, as well as a Grocery Management System utilizing NodeJS, React frameworks, and Postgres DB.\n" +
        "\n" +
        "My technical skills include proficiency in Java, Python, C, PL/SQL, and JavaScript, as well as experience with tools such as Git, Docker, Jira, and Splunk. I have also utilized various libraries such as pandas, numpy, matplotlib, sklearn, seaborn, and scikit for machine learning projects.\n" ;
    let steve_text = "I work in both client-facing and product roles for technology companies. I specialize in leveraging my software background, passion for technology, and empathy for customers to build loyal relationships and deliver meaningful products. Strong affinity for lean environments and iterating products.";
    let preet_text = "Hi, my name is Preet Dhaliwal. I am a Computer Science Student at SFSU " + 
                "pursuing my Bachelor's Degree. I also help manage service location data as a SWE Intern at TDS Telecom." +
                "I enjoy learning about new tech and endlessly watching youtube videos.";
    let chris_text = "Hi, I'm Chris Farnsworth. I'm pursuing my Bachelor's Degree in Computer Engineering at San Francisco State University. My experience is mainly in real-time embedded systems; My past projects have focused on audio signal processing and pattern recognition, and I am currently working on an environmental control systems project. I have also worked on software projects, mainly a system that provides playlist management and analytical tools for radio deejays and producers.";
    let abdul_text = "Hi, I'm Abdul Barrie, a Computer Science major currently attending San Francisco State University. " + 
                    "I used to read and write a lot as a child, then I discovered computers and video games and my life went downhill from there. " +
                    "…JK! Jokes aside, I've been interested in computers ever since I was young, which was what led me to want to join the CS " + 
                    "field when I grew up. Outside of coding, I enjoy literature, writing short stories and listening to music.";
    let nathan_text = "Hi, my name is Nathan Loo. I'm a Computer Science student at San Francisco State University currently studying for a Bachelor's degree. I was born and raised in San Francisco and from a young age I was fascinated with technology. I've been using computers my whole life so the computer science track seemed right for me. I hope to be able to become a software engineer in the future after completing my degree.";

    return (
        <Router>
            <div className="App">

                <Navbar/>

                <div className='content'>
                    <Routes>
                        <Route path='/' element={<About/>}></Route>
                        {/*this is a comment*/}
                        <Route path='/ashmitha' element={<Member name="Ashmitha Pais" photo={ashmitha_photo} text={ashmitha_text}/>}></Route>
                        <Route path='/steve' element={<Member name="Steve Betts" photo={steve_photo} text={steve_text}/>}></Route>
                        <Route path='/preet' element={<Member name="Preet Dhaliwal" photo={preet_photo} text={preet_text}/>}></Route>
                        <Route path='/chris' element={<Member name="Chris Farnsworth" photo={chris_photo} text={chris_text}/>}></Route>
                        <Route path='/abdul' element={<Member name="Abdul Barrie" photo={abdul_photo} text={abdul_text}/>}></Route>
                        <Route path='/nathan' element={<Member name="Nathan Loo" photo={nathan_photo} text={nathan_text}/>}></Route>
                    </Routes>
                </div>

            </div>
        </Router>
    );
}

export default App;