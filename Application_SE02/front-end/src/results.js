/**

Renders the component to display the recommended movies based on user preferences.
@param {Object} props - The props object that contains data and error.
@param {Array} props.data - The list of movie objects with details such as title, year, runtime, and age rating.
@param {Object} props.error - The error object, if any error occurred.
@returns {JSX.Element} - Returns the JSX component with movie recommendations.
*/
const Results = ({ data, loading, error }) => {
  return (
    <div>
      <h1 className="heading">Results</h1>
      <h2 className="heading-2">
        Based on your preferences, OpenAI recommended the following movies:
      </h2>
      <div className="results-list-container">
        {error && (
          <div className="error">Uh Oh! An Error Occured: {error.message}</div>
        )}
        {loading && <div className="error">Loading...</div>}
        {data &&
          data.map((movie) => (
            <div key={movie.movie_title} className="movie-container">
              <div className="movie-info">
                <p className="movie-title">{movie.movie_title}</p>
                <p className="movie-desc">
                  {movie.year} | {movie.runtime} Minutes | {movie.age_rating}
                </p>
                <p className="movie-desc">IMDB: {movie.imdb_link}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Results;
