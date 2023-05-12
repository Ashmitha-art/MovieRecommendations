import { useNavigate } from "react-router-dom";

/**
 * 
React functional component representing the Navbar.
@function Navbar
@returns {JSX.Element} - A JSX Element containing the navbar.
*/
function Navbar() {
  let navigate = useNavigate();

  /**

  A function that logs the user out by sending a POST request to the backend server.
  @function logout
  */
  const logout = () => {
    fetch("api/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "X-CSRFToken":
          document.cookie
            .match("(^|;)\\s*" + "csrftoken" + "\\s*=\\s*([^;]+)")
            ?.pop() || ""
      }
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
          navigate("/");
        }}
        className="navbar-button"
      >
        Home
      </button>

      {localStorage.getItem("token") && (
        <button
          onClick={() => {
            logout();
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="navbar-button"
          id="about"
        >
          Logout
        </button>
      )}

      {localStorage.getItem("token") && (
        <button
          onClick={() => {
            navigate("/my-ratings");
          }}
          className="navbar-button"
        >
          My Ratings
        </button>
      )}
      {localStorage.getItem("token") && (
        <button
          onClick={() => {
            navigate("/my-recommendations");
          }}
          className="navbar-button"
        >
          My Recommendations
        </button>
      )}

      <button
        onClick={() => {
          navigate("/about");
        }}
        className="navbar-button"
      >
        About
      </button>
    </nav>
  );
}

export default Navbar;
