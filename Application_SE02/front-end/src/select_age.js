import { useState } from "react";

function SelectAge({ element, set_element }) {
  /* --- Variables --- */
  const age_limit = 2; // Limit of how many age ratings the user can choose.
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

  // Handle onClick events for each button on the selection page.
  function handle_click(age) {
    // Add element from button clicked to global variable in 'selection_sequence.js'
    function add_age(x) {
      set_element((element) => [...element, x]);
      set_age_num(age_num + 1);
    }

    // Remove element from global variable in 'selection_sequence.js'
    function remove_age(x) {
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
          if (age_num < age_limit) {
            add_age(age);
            return { ...x, state: true };
          }
          return x;
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
      <h2 className="heading">4: Select an Age Range (Up to {age_limit})</h2>
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
            <p className="age-button-text">
              {element.age}
              <br />
            </p>
            <p className="age-button-desc-text">{element.desc}</p>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SelectAge;
