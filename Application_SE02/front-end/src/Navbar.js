import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  const routeChange = (route) => {
    let path = "/" + route;
    navigate(path);
  };

  return (
    <nav className="navbar">
      <button
        onClick={() => {
          routeChange("");
        }}
        className="navbar-button"
      >
        Home
      </button>
      <button
        onClick={() => {
          routeChange("login");
        }}
        className="navbar-button"
      >
        Login
      </button>
      <button
        onClick={() => {
          routeChange("signup");
        }}
        className="navbar-button"
      >
        Sign Up
      </button>
      <button
        onClick={() => {
          routeChange("about");
        }}
        className="navbar-button"
        id="about"
      >
        About
      </button>
    </nav>
  );
}

export default Navbar;
