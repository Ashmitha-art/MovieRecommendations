/* WRITE YOUR PHOTO PATH HERE vvv */
import ashmitha_photo from './photos/photo.jpg';
import steve_photo from './photos/photo.jpg';
import preet_photo from './photos/photo.jpg';
import chris_photo from './photos/chris.jpg';
import abdul_photo from './photos/photo.jpg';
import nathan_photo from './photos/nathan.jpg';

import Navbar from './Navbar.js';
import About from './About.js';
import Member from './Member.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    let ashmitha_text = "test1";
    let steve_text = "test2";
    let preet_text = "test3";
    let chris_text = "Hi, I'm Chris Farnsworth. I'm pursuing my Bachelor's Degree in Computer Engineering at San Francisco State University. My experience is mainly in real-time embedded systems; My past projects have focused on audio signal processing and pattern recognition, and I am currently working on an environmental control systems project. I have also worked on software projects, mainly a system that provides playlist management and analytical tools for radio deejays and producers.";
    let abdul_text = "test5";
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
