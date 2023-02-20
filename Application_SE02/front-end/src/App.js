/* WRITE YOUR PHOTO PATH HERE vvv */
import steve_photo from './photos/steve.png';

import Navbar from './Navbar.js';
import About from './About.js';
import Member from './Member.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    let ashmitha_text = "test1";
    let steve_text = "I work in both client-facing and product roles for technology companies. I specialize in leveraging my software background, passion for technology, and empathy for customers to build loyal relationships and deliver meaningful products. Strong affinity for lean environments and iterating products.";
    let preet_text = "test3";
    let chris_text = "test4";
    let abdul_text = "test5";
    let nathan_text = "test6";

    return (
        <Router>
            <div className="App"> 
                
                <Navbar/>
                
                <div className='content'>
                    <Routes>
                        <Route path='/' element={<About/>}></Route>
                        {/*this is a comment*/}
                        <Route path='/ashmitha' element={<Member name="Ashmitha Pais" photo={photo}/>}></Route>
                        <Route path='/steve' element={<Member name="Steve Betts" photo={photo}/>}></Route>
                        <Route path='/preet' element={<Member name="Preet Dhaliwal" photo={photo}/>}></Route>
                        <Route path='/chris' element={<Member name="Chris Farnsworth" photo={photo}/>}></Route>
                        <Route path='/abdul' element={<Member name="Abdul Barrie" photo={photo}/>}></Route>
                        <Route path='/nathan' element={<Member name="Nathan Loo" photo={photo}/>}></Route>
                    </Routes>
                </div>

            </div>
        </Router>
    );
}

export default App;
