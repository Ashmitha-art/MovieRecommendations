import { useNavigate } from "react-router-dom";

const MyRatings = () => {
  let navigate = useNavigate();

  return (
    <div>
      {!localStorage.getItem("token") && (
        <div className="LoginTicket">
          <p className="heading-2">You are not currently logged in.</p>
          <button
            className="get-started"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </button>
        </div>
      )}

      {localStorage.getItem("token") && (
        <div>
          <h1 className="heading">My Ratings</h1>
        </div>
      )}
    </div>
  );
};

export default MyRatings;
