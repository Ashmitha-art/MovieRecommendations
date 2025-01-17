/**

Renders the component to display the recommended movies based on user preferences.
@param {Object} props - The props object that contains data and error.
@param {Array} props.data - The list of movie objects with details such as title, year, runtime, and age rating.
@param {Object} props.error - The error object, if any error occurred.
@returns {JSX.Element} - Returns the JSX component with movie recommendations.
*/
const Results = ({ data, loading, error }) => {
  const clipnum = 45;

  return (
    <div>
      <h1 className="heading">Done!</h1>
      <h2 className="heading-2">
        Based on your choices, OpenAI recommended the following movies:
      </h2>
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
              <p className="category-info">IMDB</p>
            </li>

            <div className="movie-film-reel-clips-bottom-2">
              {[...Array(clipnum)].map((e, i) => (
                <span className="movie-individual-clips" key={i}></span>
              ))}
            </div>
          </div>
        </div>
        {error && <div className="ErrorMessage">Error: {error.message}</div>}
        {loading && <div className="error-my-list">Loading...</div>}
        {data &&
          data.map((movie) => {
            return (
              <table key={movie.movie_title} className="movie-individual">
                <tbody>
                  <tr className="movie-main-list">
                    <td className="movie-title">{movie.movie_title}</td>
                    <td className="movie-desc">
                      {movie.genres.map((genre) => {
                        return (
                          <p key={genre} className="movie-genre">
                            {genre}{" "}
                          </p>
                        );
                      })}
                      <p className="movie-desc">
                        {movie.year} | {movie.runtime} Minutes |{" "}
                        {movie.age_rating}
                      </p>
                    </td>
                    <td>
                      <a
                        className="movie-desc"
                        href={movie.imdb_link}
                        target="_blank"
                      >
                        {movie.imdb_link}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
      </div>
    </div>
  );
};

export default Results;
