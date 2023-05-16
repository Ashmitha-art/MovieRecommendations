import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyRecommendations = () => {
  let navigate = useNavigate();

  const [data, set_data] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  const [rerender, setRerender] = useState(false);

  const clipnum = 45;

  const List_Recommendations = () => {
    useEffect(() => {
      set_loading(true);
      set_error("");
      fetch("api/list_recommendations/", {
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
          set_data(data.movieRecommendations);

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
    }, [rerender]);
  };

  const handle_rating = (id, rating) => {
    if (rating === "like") {
      fetch("api/movies/" + id + "/like/", {
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
      fetch("api/movies/" + id + "/dislike/", {
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
    setRerender(!rerender);
  };

  List_Recommendations();

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
          <div className="list-container">
            <div className="category-container">
              <div className="movie-film-reel-list">
                <div className="movie-film-reel-clips-top-2">
                  {[...Array(clipnum)].map((e, i) => (
                    <span className="movie-individual-clips" key={i}></span>
                  ))}
                </div>

                <li className="category-list">
                  <p className="category-title">Title</p>
                  <p className="category-info">Info</p>
                  <p className="category-rating">Rating</p>
                </li>

                <div className="movie-film-reel-clips-bottom-2">
                  {[...Array(clipnum)].map((e, i) => (
                    <span className="movie-individual-clips" key={i}></span>
                  ))}
                </div>
              </div>
            </div>

            {data.map((movie) => {
              return (
                <table key={movie.title} className="movie-individual">
                  <tbody>
                    <tr className="movie-main-list">
                      <td className="movie-title">{movie.title}</td>
                      <td className="movie-desc">
                        {movie.genres.map((genre) => {
                          return (
                            <p key={genre} className="movie-genre">
                              {genre}{" "}
                            </p>
                          );
                        })}
                        <p className="movie-stats">
                          | {movie.year} | {movie.runtime} Minutes |{" "}
                          {movie.rating}
                        </p>
                      </td>
                      <td className="movie-rating-container">
                        <label className="like-off">
                          <input
                            className="movie-rating-checkbox"
                            type="checkbox"
                            onClick={() => {
                              handle_rating(movie.movie_id, "like");
                            }}
                          />
                          <span className="material-symbols-outlined">
                            thumb_up
                          </span>
                        </label>

                        <label className="dislike-off">
                          <input
                            className="movie-rating-checkbox"
                            type="checkbox"
                            onClick={() => {
                              handle_rating(movie.movie_id, "dislike");
                            }}
                          />
                          <span className="material-symbols-outlined">
                            thumb_down
                          </span>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
            {error && <p className="ErrorMessage">Error: {error.message}</p>}
            {loading && <div className="error-my-list">Loading...</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecommendations;
