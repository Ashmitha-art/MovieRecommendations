import { useNavigate } from "react-router-dom";
import MovAI_Logo from "./photos/LogosandIcons/MovAILogo(Transparent2).png"

/**

Renders the Home component which displays a welcome message and a button to navigate to the recommendation page.
@returns {JSX.Element} The Home component UI.
*/
function Home() {
  let navigate = useNavigate();

   // MovAI Logo
   const logo = [
    {
      title: "MovAI Logo",
      photo: MovAI_Logo
    }
  ];

  /**

  Redirects the user to a new page based on the provided route.
  @param {string} route - The route to navigate to.
  */
  const routeChange = (route) => {
    let path = "/" + route;
    navigate(path);
  };

  return (
    <div>
      <img 
        className="movai-logo"
        src={MovAI_Logo}
        alt={logo.title} 
      />

      <h1 className="heading">Welcome to MovAI!</h1>

      {!localStorage.getItem("token") && (
        <div className="home-page-container">
          <div className="LoginTicket">
            <p className="heading-2">Not logged in?</p>
            <button
              className="get-started"
              onClick={() => {
                routeChange("login");
              }}
            >
              Login
            </button>
          </div>
          <div className="RegisterTicket">
            <p className="heading-2">Not signed up?</p>
            <button
              className="get-started"
              onClick={() => {
                routeChange("signup");
              }}
            >
              Signup
            </button>
          </div>
        </div>
      )}

      {localStorage.getItem("token") && (
        <div>
          <p className="heading-2">Logged in?</p>
          <button
            className="get-started"
            onClick={() => {
              routeChange("recommend");
            }}
          >
            Get Started!
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
