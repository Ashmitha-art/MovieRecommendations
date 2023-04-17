import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  const routeChange = (route) => {
    let path = "/" + route;
    navigate(path);
  };

  return (
    <div>
      <h1 className="heading">Welcome to MovAI!</h1>

      <button
        className="get-started"
        onClick={() => {
          routeChange("recommend");
        }}
      >
        Get Started!
      </button>
    </div>
  );
}

export default Home;
