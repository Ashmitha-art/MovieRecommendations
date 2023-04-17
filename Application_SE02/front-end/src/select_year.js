import { useState } from "react";

function SelectYear({ element, set_element }) {
  const year_limit = 2;
  const [year_num, set_year_num] = useState(0);
  const [years, set_years] = useState([
    {
      year: "Prehistoric",
      desc: "1920 to 1940",
      state: false,
    },
    {
      year: "Vintage",
      desc: "1940 to 1960",
      state: false,
    },
    {
      year: "Classic",
      desc: "1960 to 1980",
      state: false,
    },
    {
      year: "Retro",
      desc: "1980 to 2000",
      state: false,
    },
    {
      year: "Recent",
      desc: "2000 to 2020",
      state: false,
    },
  ]);

  function handle_click(year) {
    function remove_year(x) {
      set_element(
        element.filter((year) => {
          return year != x;
        })
      );
      set_year_num(year_num - 1);
    }

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
