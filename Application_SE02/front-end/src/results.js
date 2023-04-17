const Results = ({ data, error }) => {
  /*
  {
    'movie_title': movie_title,
    'year': year,
    'runtime': runtime,
    'age_rating': age_rating,
    #'genres': genres
  }
  */

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
        {data &&
          data.map((movie) => (
            <div key={movie.movie_title} className="movie-container">
              <p className="movie-title">{movie.movie_title}</p>
              <p className="movie-desc">
                {movie.year} | {movie.runtime} Minutes | {movie.age_rating}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Results;
