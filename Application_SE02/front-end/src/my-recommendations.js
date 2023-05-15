import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyRecommendations = () => {
  let navigate = useNavigate();

  const [data, set_data] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  const list_recommendations = () => {
    useEffect(() => {
      fetch("api/list_recommendations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
          // Include the CSRF token in the headers
          "X-CSRFToken":
            document.cookie
              .match("(^|;)\\s*" + "csrftoken" + "\\s*=\\s*([^;]+)")
              ?.pop() || ""
        },
        body: localStorage.getItem("id")
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
    }, ["api/list_recommendations"]);
  };

  const handle_rating = (id, rating) => {
    if (rating === "like") {
      console.log("liked");
      fetch("api/movies/" + id + "like", {
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
    } else {
      console.log("disliked");
      fetch("api/movies/" + id + "like", {
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
    }
  };

  list_recommendations();

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
          <h1 className="heading">Recommendation History</h1>
          {data.map((movie) => {
            return (
              <div key={movie.id} className="movie-container">
                <div className="movie-info">
                  <p className="movie-title">{movie.title}</p>
                  <div className="movie-desc">
                    {movie.genres.map((genre) => {
                      return (
                        <p key={genre} className="movie-genre">
                          {genre}{" "}
                        </p>
                      );
                    })}
                    <p className="movie-stats">
                      | {movie.year} | {movie.runtime} Minutes | {movie.rating}
                    </p>
                  </div>
                </div>

                <div className="movie-rating-container">
                  <label className="like-off">
                    <input
                      className="movie-rating-checkbox"
                      type="checkbox"
                      onClick={() => {
                        handle_rating(movie.id, "like");
                      }}
                    />
                    <span className="material-symbols-outlined">thumb_up</span>
                  </label>

                  <label className="dislike-off">
                    <input
                      className="movie-rating-checkbox"
                      type="checkbox"
                      onClick={() => {
                        handle_rating(movie.id, "dislike");
                      }}
                    />
                    <span className="material-symbols-outlined">
                      thumb_down
                    </span>
                  </label>
                </div>
              </div>
            );
          })}
          {error && (
            <p className="error">Uh Oh! An Error Occured: {error.message}</p>
          )}
          {loading && <div className="error">Loading...</div>}

          <h2 className="heading-2">Test Divs:</h2>

          <div className="movie-container">
            <div className="movie-info">
              <p className="movie-title">Test Title 1</p>
              <div className="movie-desc">
                <p className="movie-genre">Action Adventure </p>
                <p className="movie-stats">| 2022 | 120 Minutes | PG-13</p>
              </div>
            </div>

            <div className="movie-rating-container">
              <label className="like-off">
                <input
                  className="movie-rating-checkbox"
                  type="checkbox"
                  onClick={() => {
                    handle_rating(1, "like");
                  }}
                />
                <span className="material-symbols-outlined">thumb_up</span>
              </label>

              <label className="dislike-off">
                <input
                  className="movie-rating-checkbox"
                  type="checkbox"
                  onClick={() => {
                    handle_rating(1, "dislike");
                  }}
                />
                <span className="material-symbols-outlined">thumb_down</span>
              </label>
            </div>
          </div>
          <div className="movie-container">
            <div className="movie-info">
              <p className="movie-title">Test Title 2</p>
              <div className="movie-desc">
                <p className="movie-genre">Action Adventure </p>
                <p className="movie-stats">| 2023 | 120 Minutes | PG-13</p>
              </div>
            </div>

            <div className="movie-rating-container">
              <label className="like-off">
                <input
                  className="movie-rating-checkbox"
                  type="checkbox"
                  onClick={() => {
                    handle_rating(1, "like");
                  }}
                />
                <span className="material-symbols-outlined">thumb_up</span>
              </label>

              <label className="dislike-off">
                <input
                  className="movie-rating-checkbox"
                  type="checkbox"
                  onClick={() => {
                    handle_rating(1, "dislike");
                  }}
                />
                <span className="material-symbols-outlined">thumb_down</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecommendations;
