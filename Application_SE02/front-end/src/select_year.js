import { useState } from "react";

/**

React component that renders a year selection interface.
@param {Object} param - Component parameters.
@param {Array} param.element - Array of selected years.
@param {Function} param.set_element - Function to update the array of selected years.
@returns {JSX.Element} - JSX element that renders the year selection interface.
*/
function SelectYear({ element, set_element }) {
  const year_limit = 2;
  const [year_num, set_year_num] = useState(0);
  const [years, set_years] = useState([
    {
      year: "Prehistoric",
      desc: "1920 to 1940",
      state: false
    },
    {
      year: "Vintage",
      desc: "1940 to 1960",
      state: false
    },
    {
      year: "Classic",
      desc: "1960 to 1980",
      state: false
    },
    {
      year: "Retro",
      desc: "1980 to 2000",
      state: false
    },
    {
      year: "Recent",
      desc: "2000 to 2020",
      state: false
    }
  ]);

  /**

  Callback function that handles a year button click event.
  @param {string} year - The year range description associated with the clicked button.
  @returns {void}
  */
  function handle_click(year) {
    /**

    Removes the selected year from the selected years array
    @param {string} x - The year range description to be removed
    */
    function remove_year(x) {
      set_element(
        element.filter((year) => {
          return year != x;
        })
      );
      set_year_num(year_num - 1);
    }

    /**

    Adds the selected year to the selected years array
    @param {string} x - The year range description to be added
    */
    function add_year(x) {
      set_element((element) => [...element, x]);
      set_year_num(year_num + 1);
    }

    const new_years = years.map((x) => {
      if (x.desc === year) {
        if (x.state) {
          remove_year(year);
          return { ...x, state: false };
        } else {
          if (year_num < year_limit) {
            add_year(year);
            return { ...x, state: true };
          }
          return x;
        }
      } else {
        return x;
      }
    });

    set_years(new_years);
  }

  return (
    <div>
      <h2 className="heading">2: Select a Year Range (Up to {year_limit})</h2>
      <div className="year-button-container">
        {years.map((element, index) => (
          <label
            key={index}
            className={`year-button-${element.state ? "on" : "off"}`}
          >
            <input
              className="year-button-checkbox"
              type="checkbox"
              onClick={() => {
                handle_click(element.desc);
              }}
            />
            <p className="year-button-text">
              {element.year}
              <br />
            </p>
            <p className="year-button-desc-text">{element.desc}</p>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SelectYear;
