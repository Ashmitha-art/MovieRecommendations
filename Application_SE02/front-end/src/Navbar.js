import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  const routeChange = (route) => {
    let path = "/" + route;
    navigate(path);
  };

  const logout = () => {
    fetch("api/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch data.");
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
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
      {!localStorage.getItem("token") && (
        <button
          onClick={() => {
            routeChange("login");
            routeChange("/");
          }}
          className="navbar-button"
        >
          Login
        </button>
      )}
      {localStorage.getItem("token") && (
        <button
          onClick={() => {
            logout();
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="navbar-button"
        >
          Logout
        </button>
      )}
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
          routeChange("my-list");
        }}
        className="navbar-button"
      >
        My List
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
