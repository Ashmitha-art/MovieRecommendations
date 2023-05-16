import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyRecommendations = () => {
  let navigate = useNavigate();

  const [data, set_data] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  const clipnum = 45;

  const List_Recommendations = () => {
    useEffect(() => {
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
    }, ["api/list_recommendations"]);
  };

  const handle_rating = (id, rating) => {
    if (rating === "like") {
      console.log("liked");
      console.log(id);
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
      console.log("disliked");
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
            {loading && <div className="error">Loading...</div>}

            {/*<h2 className="ErrorMessage">Test Movies:</h2>*/}
            {/*<table className="movie-individual">*/}
            {/*  <tbody>*/}
            {/*    <tr className="movie-main-list">*/}
            {/*      <td className="movie-title">John Wick: Chapter 4</td>*/}
            {/*      <td className="movie-desc">*/}
            {/*        <p className="movie-genre">Action Crime Thriller </p>*/}
            {/*        <p className="movie-stats">| 2023 | 169 Minutes | R</p>*/}
            {/*      </td>*/}
            {/*      <td className="movie-rating-container">*/}
            {/*        <label className="like-off">*/}
            {/*          <input*/}
            {/*            className="movie-rating-checkbox"*/}
            {/*            type="checkbox"*/}
            {/*            onClick={() => {*/}
            {/*              handle_rating(1, "like");*/}
            {/*            }}*/}
            {/*          />*/}
            {/*          <span className="material-symbols-outlined">*/}
            {/*            thumb_up*/}
            {/*          </span>*/}
            {/*        </label>*/}

            {/*        <label className="dislike-off">*/}
            {/*          <input*/}
            {/*            className="movie-rating-checkbox"*/}
            {/*            type="checkbox"*/}
            {/*            onClick={() => {*/}
            {/*              handle_rating(1, "dislike");*/}
            {/*            }}*/}
            {/*          />*/}
            {/*          <span className="material-symbols-outlined">*/}
            {/*            thumb_down*/}
            {/*          </span>*/}
            {/*        </label>*/}
            {/*      </td>*/}
            {/*    </tr>*/}
            {/*  </tbody>*/}
            {/*</table>*/}
            {/*<table className="movie-individual">*/}
            {/*  <tbody>*/}
            {/*    <tr className="movie-main-list">*/}
            {/*      <td className="movie-title">*/}
            {/*        John Wick: Chapter 3 - Parabellum*/}
            {/*      </td>*/}
            {/*      <td className="movie-desc">*/}
            {/*        <p className="movie-genre">Action Crime Thriller </p>*/}
            {/*        <p className="movie-stats">| 2019 | 131 Minutes | R</p>*/}
            {/*      </td>*/}
            {/*      <td className="movie-rating-container">*/}
            {/*        <label className="like-off">*/}
            {/*          <input*/}
            {/*            className="movie-rating-checkbox"*/}
            {/*            type="checkbox"*/}
            {/*            onClick={() => {*/}
            {/*              handle_rating(1, "like");*/}
            {/*            }}*/}
            {/*          />*/}
            {/*          <span className="material-symbols-outlined">*/}
            {/*            thumb_up*/}
            {/*          </span>*/}
            {/*        </label>*/}

            {/*        <label className="dislike-off">*/}
            {/*          <input*/}
            {/*            className="movie-rating-checkbox"*/}
            {/*            type="checkbox"*/}
            {/*            onClick={() => {*/}
            {/*              handle_rating(1, "dislike");*/}
            {/*            }}*/}
            {/*          />*/}
            {/*          <span className="material-symbols-outlined">*/}
            {/*            thumb_down*/}
            {/*          </span>*/}
            {/*        </label>*/}
            {/*      </td>*/}
            {/*    </tr>*/}
            {/*  </tbody>*/}
            {/*</table>*/}
            {/*<table className="movie-individual">*/}
            {/*  <tbody>*/}
            {/*    <tr className="movie-main-list">*/}
            {/*      <td className="movie-title">John Wick: Chapter 2</td>*/}
            {/*      <td className="movie-desc">*/}
            {/*        <p className="movie-genre">Action Crime Thriller </p>*/}
            {/*        <p className="movie-stats">| 2017 | 122 Minutes | R</p>*/}
            {/*      </td>*/}
            {/*      <td className="movie-rating-container">*/}
            {/*        <label className="like-off">*/}
            {/*          <input*/}
            {/*            className="movie-rating-checkbox"*/}
            {/*            type="checkbox"*/}
            {/*            onClick={() => {*/}
            {/*              handle_rating(1, "like");*/}
            {/*            }}*/}
            {/*          />*/}
            {/*          <span className="material-symbols-outlined">*/}
            {/*            thumb_up*/}
            {/*          </span>*/}
            {/*        </label>*/}

            {/*        <label className="dislike-off">*/}
            {/*          <input*/}
            {/*            className="movie-rating-checkbox"*/}
            {/*            type="checkbox"*/}
            {/*            onClick={() => {*/}
            {/*              handle_rating(1, "dislike");*/}
            {/*            }}*/}
            {/*          />*/}
            {/*          <span className="material-symbols-outlined">*/}
            {/*            thumb_down*/}
            {/*          </span>*/}
            {/*        </label>*/}
            {/*      </td>*/}
            {/*    </tr>*/}
            {/*  </tbody>*/}
            {/*</table>*/}
            {/*<table className="movie-individual">*/}
            {/*  <tbody>*/}
            {/*    <tr className="movie-main-list">*/}
            {/*      <td className="movie-title">John Wick</td>*/}
            {/*      <td className="movie-desc">*/}
            {/*        <p className="movie-genre">Action Crime Thriller </p>*/}
            {/*        <p className="movie-stats">| 2014 | 101 Minutes | R</p>*/}
            {/*      </td>*/}
            {/*      <td className="movie-rating-container">*/}
            {/*        <label className="like-off">*/}
            {/*          <input*/}
            {/*            className="movie-rating-checkbox"*/}
            {/*            type="checkbox"*/}
            {/*            onClick={() => {*/}
            {/*              handle_rating(1, "like");*/}
            {/*            }}*/}
            {/*          />*/}
            {/*          <span className="material-symbols-outlined">*/}
            {/*            thumb_up*/}
            {/*          </span>*/}
            {/*        </label>*/}

            {/*        <label className="dislike-off">*/}
            {/*          <input*/}
            {/*            className="movie-rating-checkbox"*/}
            {/*            type="checkbox"*/}
            {/*            onClick={() => {*/}
            {/*              handle_rating(1, "dislike");*/}
            {/*            }}*/}
            {/*          />*/}
            {/*          <span className="material-symbols-outlined">*/}
            {/*            thumb_down*/}
            {/*          </span>*/}
            {/*        </label>*/}
            {/*      </td>*/}
            {/*    </tr>*/}
            {/*  </tbody>*/}
            {/*</table>*/}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecommendations;
