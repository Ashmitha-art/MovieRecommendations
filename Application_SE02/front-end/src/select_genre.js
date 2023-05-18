import { useState } from "react";

/** Imported photos for each genre option. */
import action_logo from "./photos/LogosandIcons/Action Logo.png";
import adventure_logo from "./photos/LogosandIcons/Adventure Logo.png";
import comedy_logo from "./photos/LogosandIcons/Comedy Logo.png";
import drama_logo from "./photos/LogosandIcons/Drama Logo.png";
import horror_logo from "./photos/LogosandIcons/Horror Logo.png";
import thriller_logo from "./photos/LogosandIcons/Thriller Logo.png";
import mystery_logo from "./photos/LogosandIcons/Mystery Logo.png";
import crime_logo from "./photos/LogosandIcons/Crime Logo.png";
import animation_logo from "./photos/LogosandIcons/Animation Logo.png";
import scifi_logo from "./photos/LogosandIcons/Sci-Fi Logo.png";
import fantasy_logo from "./photos/LogosandIcons/Fantasy Logo.png";
import romance_logo from "./photos/LogosandIcons/Romance Logo.png";

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
      photo: action_logo,
      state: false
    },
    {
      genre: "Adventure",
      photo: adventure_logo,
      state: false
    },
    {
      genre: "Comedy",
      photo: comedy_logo,
      state: false
    },
    {
      genre: "Drama",
      photo: drama_logo,
      state: false
    },
    {
      genre: "Horror",
      photo: horror_logo,
      state: false
    },
    {
      genre: "Thriller",
      photo: thriller_logo,
      state: false
    },
    {
      genre: "Mystery",
      photo: mystery_logo,
      state: false
    },
    {
      genre: "Crime",
      photo: crime_logo,
      state: false
    },
    {
      genre: "Animation",
      photo: animation_logo,
      state: false
    },
    {
      genre: "Sci-Fi",
      photo: scifi_logo,
      state: false
    },
    {
      genre: "Fantasy",
      photo: fantasy_logo,
      state: false
    },
    {
      genre: "Romance",
      photo: romance_logo,
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
          return genre !== x;
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
      <h2 className="heading-question-one">Let's get started!</h2>
        <h2 className="heading-question-one-2">First off, what are your favorite genres? (Pick up to {genre_limit})</h2>
      <div className="general-theater-border">
      <div className="genre-theater-border">
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

              <img
                key={index.photo}
                className="genre-button-img"
                src={element.photo}
                alt={element.title}
              />

              <p className="genre-button-text">{element.genre}</p>
            </label>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectGenre;
