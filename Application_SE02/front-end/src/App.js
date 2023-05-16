import Home from "./Home";
import About from "./About";
import Navbar from "./Navbar";
import Member from "./Member";
import Login from "./LoginFunctional";
import Signup from "./SignupFunctional";
import Recommend from "./recommend";
import MyRatings from "./my-ratings";
import MyRecommendations from "./my-recommendations";
import MyList from "./my-list";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/**
The main App component.

@function

@returns {JSX.Element} The rendered App component.
*/
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/about" element={<About />}></Route>

            <Route path="my-list" element={<MyList />}></Route>

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

            <Route path="/recommend" element={<Recommend />}></Route>
            <Route path="/my-ratings" element={<MyRatings />}></Route>
            <Route
              path="/my-recommendations"
              element={<MyRecommendations />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
