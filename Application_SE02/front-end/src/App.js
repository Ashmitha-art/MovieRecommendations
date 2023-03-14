import Home from './Home.js';
import About from './About.js';
import Navbar from './Navbar.js';
import Member from './Member.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    return (
        <Router>
            <div className="App">
                <Navbar/>
                <div className='content'>
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/about' element={<About/>}></Route>

                        <Route path='/ashmitha' element={<Member name="Ashmitha Pais"/>}></Route>
                        <Route path='/steve' element={<Member name="Steve Betts"/>}></Route>
                        <Route path='/preet' element={<Member name="Preet Dhaliwal"/>}></Route>
                        <Route path='/chris' element={<Member name="Chris Farnsworth"/>}></Route>
                        <Route path='/abdul' element={<Member name="Abdul Barrie"/>}></Route>
                        <Route path='/nathan' element={<Member name="Nathan Loo"/>}></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;