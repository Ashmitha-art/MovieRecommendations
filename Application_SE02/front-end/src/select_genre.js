import { useState } from "react";

/**

A component to display and handle selection of genres.
@param {Array} element - An array of selected genres.
@param {Function} set_element - A function to set the selected genres.
@returns {JSX.Element} A JSX Element that displays the genres and allows selection of up to 3 genres.
*/
function SelectGenre({ element, set_element }) {
  const genre_limit = 3;
  const [genre_num, set_genre_num] = useState(0);
  const [genres, set_genres] = useState([
    {
      genre: "Action",
      state: false
    },
    {
      genre: "Adventure",
      state: false
    },
    {
      genre: "Comedy",
      state: false
    },
    {
      genre: "Drama",
      state: false
    },
    {
      genre: "Horror",
      state: false
    },
    {
      genre: "Thriller",
      state: false
    },
    {
      genre: "Mystery",
      state: false
    },
    {
      genre: "Crime",
      state: false
    },
    {
      genre: "Animation",
      state: false
    },
    {
      genre: "Sci-Fi",
      state: false
    },
    {
      genre: "Fantasy",
      state: false
    },
    {
      genre: "Romance",
      state: false
    }
  ]);

  /**

  Handles the click event for the genre buttons.
  @param {String} genre - The genre that was clicked.
  @returns {void}
  */
  function handle_click(genre) {
    /**
     
    Removes a genre from the selected genres array.
    @param {String} x - The genre to remove.
    @returns {void}
    */
    function remove_genre(x) {
      set_element(
        element.filter((genre) => {
          return genre != x;
        })
      );
      set_genre_num(genre_num - 1);
    }

    /*
     * Adds a genre to the selected genres array.
     * @param {String} x - The genre to add.
     * @returns {void}
     */
    function add_genre(x) {
      set_element((element) => [...element, x]);
      set_genre_num(genre_num + 1);
    }

    const new_genres = genres.map((x) => {
      if (x.genre === genre) {
        if (x.state) {
          remove_genre(genre);
          return { ...x, state: false };
        } else {
          if (genre_num < genre_limit) {
            add_genre(genre);
            return { ...x, state: true };
          }
          return x;
        }
      } else {
        return x;
      }
    });

    set_genres(new_genres);
  }

  return (
    <div>
      <h2 className="heading">1: Select a Genre (Up to {genre_limit})</h2>
      <div className="genre-button-container">
        {genres.map((element, index) => (
          <label
            key={index}
            className={`genre-button-${element.state ? "on" : "off"}`}
          >
            <input
              className="genre-button-checkbox"
              type="checkbox"
              onClick={() => {
                handle_click(element.genre);
              }}
            />
            <p className="genre-button-text">{element.genre}</p>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SelectGenre;
