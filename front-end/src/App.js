import photo from './photo.jpg';

import Navbar from './Navbar.js';
import About from './About.js';
import Member from './Member.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
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
