import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const MyRatings = () => {
  let navigate = useNavigate();

  const [data, set_data] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  const get_ratings = () => {
    useEffect(() => {
      const abort_controller = new AbortController();

      fetch("api/ratinghistory", {
        signal: abort_controller.signal,
        body: localStorage.getItem("id"),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
          // Include the CSRF token in the headers
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
        .then((data) => {
          set_data(data);
          set_loading(false);
          set_error(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") console.log("Fetch was aborted.");
          else {
            set_error(err);
            set_loading(false);
          }
        });
      return () => abort_controller.abort();
    }, ["api/ratinghistory"]);
  };

  const remove_rating = (id) => {
    fetch("api/movies/" + id + "unrate", {
      signal: abort_controller.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
        // Include the CSRF token in the headers
        "X-CSRFToken":
          document.cookie
            .match("(^|;)\\s*" + "csrftoken" + "\\s*=\\s*([^;]+)")
            ?.pop() || ""
      }
    });
  };

  get_ratings();

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
          {data.map((movie) => {
            return (
              <div key={movie.id} className="movie-container">
                <div className="movie-info">
                  <p className="movie-title">{movie.title}</p>
                  <div className="movie-desc">
                    <p className="movie-stats">{movie.year}</p>
                  </div>
                </div>
                <div className="movie-rating-container">
                  {movie.rating === 1 && (
                    <label className="like-on">
                      <span className="material-symbols-outlined">
                        thumb_up
                      </span>
                    </label>
                  )}
                  {movie.rating === 0 && (
                    <label className="dislike-on">
                      <span className="material-symbols-outlined">
                        thumb_down
                      </span>
                    </label>
                  )}

                  <label className="movie-remove">
                    <input
                      className="movie-rating-checkbox"
                      type="checkbox"
                      onClick={() => {
                        remove_rating(movie.id);
                      }}
                    />
                    <span class="material-symbols-outlined">
                      delete_forever
                    </span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRatings;
