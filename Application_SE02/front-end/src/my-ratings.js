import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const MyRatings = () => {
  let navigate = useNavigate();

  const [data, set_data] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  const clipnum = 45;

  const Get_Ratings = () => {
    useEffect(() => {
      fetch("api/ratinghistory/", {
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
          set_data(data.movie);
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
    }, ["api/ratinghistory"]);
  };

  const remove_rating = (id) => {
    fetch("api/movies/" + id + "/unrate/", {
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

  Get_Ratings();

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
                      <td className="movie-desc">{movie.year}</td>
                      <td className="movie-rating-container">
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
                              remove_rating(movie.mid);
                            }}
                          />
                          <span class="material-symbols-outlined">
                            delete_forever
                          </span>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
            {error && <p className="ErrorMessage">Error: {error.message}</p>}
            {loading && <div className="error">Loading...</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRatings;
