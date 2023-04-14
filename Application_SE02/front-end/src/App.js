import Home from "./home";
import About from "./about";
import Navbar from "./navbar";
import Member from "./member";
import Login from "./login";
import SignUp from "./signup";
import Recommend from "./recommend";
import MyList from "./my-list";
import Results from "./results";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [is_logged_in, set_is_logged_in] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/recommend" element={<Recommend />}></Route>
            <Route path="/results" element={<Results />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
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
