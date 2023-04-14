import Home from './Home';
import About from './About';
import Navbar from './Navbar';
import Member from './Member';
import SelectionSequence from './selection_sequence';
import Login from '../src/Login';
import SignUp from '../src/Signup';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    return (
        <Router>
            <div className="App">
                <Navbar/>
                <div className='content'>
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/recommend' element={<SelectionSequence/>}></Route>
                        <Route path='/about' element={<About/>}></Route>

                        
                        <Route path="/login" element={<Login/>}></Route>  
                        <Route path="/signup" element={<SignUp/>}></Route>


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