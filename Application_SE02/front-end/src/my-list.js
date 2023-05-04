import { useState } from "react";

/**

A React component that displays a list of movies and allows the user to rate them.
@component
*/
function MyList() {
  /**

  State hook for storing the list of movies.
  @type {[Array]}
  */
  const [movies, set_movies] = useState([
    {
      title: "John Wick: Chapter 4",
      genres: ["Action", "Thriller", "Crime"],
      year: 2023,
      runtime: "170 Minutes",
      rating: "R",
      liked: false,
      disliked: false
    },
    {
      title: "John Wick: Chapter 3 - Parabellum",
      genres: ["Action", "Thriller", "Crime"],
      year: 2019,
      runtime: "131 Minutes",
      rating: "R",
      liked: false,
      disliked: false
    },
    {
      title: "John Wick: Chapter 2",
      genres: ["Action", "Thriller", "Crime"],
      year: 2017,
      runtime: "122 Minutes",
      rating: "R",
      liked: false,
      disliked: false
    },
    {
      title: "John Wick",
      genres: ["Action", "Thriller", "Crime"],
      year: 2014,
      runtime: "101 Minutes",
      rating: "R",
      liked: false,
      disliked: false
    }
  ]);

  /**

  Handles the click event of a rating checkbox and updates the corresponding movie's rating.
  @param {Object} movie - The movie object to update.
  @param {String} rating - The rating to apply ("like" or "dislike").
  */
  const handle_click = (movie, rating) => {
    const new_movies = movies.map((x) => {
      if (x.title === movie) {
        if (rating === "like") {
          return { ...x, liked: true, disliked: false };
        } else {
          return { ...x, liked: false, disliked: true };
        }
      }
      return x;
    });

    set_movies(new_movies);
  };

  return (
    <div>
      <h1 className="heading">My List (Work In Progress)</h1>

      <div className="list-container">
        {movies.map((movie) => (
          <div key={movie.title} className="movie-container">
            <div className="movie-info">
              <p className="movie-title">{movie.title}</p>
              <p className="movie-desc">
                {movie.genres} | {movie.year} | {movie.runtime} | {movie.rating}
              </p>
            </div>
            <div className="movie-rating-container">
              <label className={`like-${movie.liked ? "on" : "off"}`}>
                <input
                  className="movie-rating-checkbox"
                  type="checkbox"
                  onClick={() => {
                    handle_click(movie.title, "like");
                  }}
                />
                <span class="material-symbols-outlined">thumb_up</span>
              </label>

              <label className={`dislike-${movie.disliked ? "on" : "off"}`}>
                <input
                  className="movie-rating-checkbox"
                  type="checkbox"
                  onClick={() => {
                    handle_click(movie.title, "dislike");
                  }}
                />
                <span class="material-symbols-outlined">thumb_down</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyList;
