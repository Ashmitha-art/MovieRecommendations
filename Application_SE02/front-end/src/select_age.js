import { useState } from "react";

/**

A React component for selecting an age range.
@param {Object} props - The props object.
@param {Array} props.element - An array of selected age ratings.
@param {function} props.set_element - A function to set the selected age ratings.
@returns {JSX.Element} - A JSX object representing the age selection component.
*/
function SelectAge({ element, set_element }) {
  /* --- Variables --- */
  const [age_num, set_age_num] = useState(0); // Sets the current number of selected age ratings.
  const [ages, set_ages] = useState([
    // Descriptions of age ratings
    {
      age: "G",
      desc: "Recommended for Young Children",
      state: false
    },
    {
      age: "PG",
      desc: "Recommended for Children",
      state: false
    },
    {
      age: "PG-13",
      desc: "Recommended for Teens",
      state: false
    },
    {
      age: "R",
      desc: "Recommended for Adults",
      state: false
    },
    {
      age: "NC-17",
      desc: "Adults Only",
      state: false
    }
  ]);

  /* --- Functions --- */

  /**

  Handles the onClick event for each age button on the selection page.
  @param {string} age - The age rating of the button clicked.
  @returns {void}
  */
  function handle_click(age) {
    // Handle onClick events for each button on the selection page.
    /*
    Adds the selected age rating to the global 'element' state and increments 'age_num'.
    @param {string} x - The age rating to be added.
    @returns {void}
    */
    function add_age(x) {
      // Add element from button clicked to global variable in 'selection_sequence.js'
      set_element((element) => [...element, x]);
      set_age_num(age_num + 1);
    }

    /**

    Removes the selected age rating from the global 'element' state and decrements 'age_num'.
    @param {string} x - The age rating to be removed.
    @returns {void}
    */
    function remove_age(x) {
      // Remove element from global variable in 'selection_sequence.js'
      set_element(
        element.filter((age) => {
          return age != x;
        })
      );
      set_age_num(age_num - 1);
    }

    // Update the 'ages' list based on which button was clicked.
    const new_ages = ages.map((x) => {
      if (x.age === age) {
        if (x.state) {
          remove_age(age);
          return { ...x, state: false };
        } else {
          add_age(age);
          return { ...x, state: true };
        }
      } else {
        return x;
      }
    });

    set_ages(new_ages);
  }

  /* --- Returned JSX object --- */
  return (
    <div>
      <h2 className="heading">4: Select an Age Range</h2>
      <div className="age-button-container">
        {ages.map((element, index) => (
          <label
            key={index}
            className={`age-button-${element.state ? "on" : "off"}`}
          >
            <input
              className="age-button-checkbox"
              type="checkbox"
              onClick={() => {
                handle_click(element.age);
              }}
            />
            <p className="age-button-text">{element.age}</p>
            <p className="age-button-desc-text">{element.desc}</p>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SelectAge;
