import { useState } from "react";

/**

A React component that displays a list of movies and allows the user to rate them.
@component
*/
const MyList = () => {
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
  }
    const clipnum = 45;


  return (
    <div>
      <h1 className="heading">My List (Work In Progress)</h1>
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

        <div className="movie-container">
          {movies.map((movie) => (
            <table key={movie.title} className="movie-individual">
              <tbody>
              <tr>
                <td className="movie-title">{movie.title}</td>          
                <td className="movie-desc">
                    {movie.genres} | {movie.year} | {movie.runtime} | {movie.rating}
                </td>
                <td className="movie-rating-container">
                  <label className={`like-${movie.liked ? "on" : "off"}`}>
                  <input
                    className="movie-rating-checkbox"
                    type="checkbox"
                    onClick={() => {
                      handle_click(movie.title, "like");
                    }}
                  />
                    <span className="material-symbols-outlined">thumb_up</span>
                  </label>

                <label className={`dislike-${movie.disliked ? "on" : "off"}`}>
                  <input
                    className="movie-rating-checkbox"
                    type="checkbox"
                    onClick={() => {
                      handle_click(movie.title, "dislike");
                    }}
                  />
                  <span className="material-symbols-outlined">thumb_down</span>
                </label>
              </td>
              </tr>
              </tbody>
          </table>
        ))}
        </div>  
          </div>
        </div>
        
      
  );
};

export default MyList;
