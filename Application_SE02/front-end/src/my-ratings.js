import { useNavigate } from "react-router-dom";

const MyRatings = () => {
  let navigate = useNavigate();

  const routeChange = (route) => {
    let path = "/" + route;
    navigate(path);
  };

  return (
    <div>
      {!localStorage.getItem("token") && (
        <div className="LoginTicket">
          <p className="heading-2">You are not currently logged in.</p>
          <button
            className="get-started"
            onClick={() => {
              routeChange("");
            }}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRatings;
