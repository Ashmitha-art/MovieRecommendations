import Home from "./Home";
import About from "./About";
import Navbar from "./Navbar";
import Member from "./Member";
import Login from "./Login";
import SignUp from "./Signup";
import Recommend from "./recommend";
import MyList from "./my-list";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/recommend" element={<Recommend />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>

            <Route path="/my-list" element={<MyList />}></Route>
            <Route
              path="/ashmitha"
              element={<Member name="Ashmitha Pais" />}
            ></Route>
            <Route
              path="/steve"
              element={<Member name="Steve Betts" />}
            ></Route>
            <Route
              path="/preet"
              element={<Member name="Preet Dhaliwal" />}
            ></Route>
            <Route
              path="/chris"
              element={<Member name="Chris Farnsworth" />}
            ></Route>
            <Route
              path="/abdul"
              element={<Member name="Abdul Barrie" />}
            ></Route>
            <Route
              path="/nathan"
              element={<Member name="Nathan Loo" />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
