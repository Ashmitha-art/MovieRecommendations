import { useState } from "react";
import SelectGenre from "./select_genre";
import SelectYear from "./select_year";
import SelectRuntime from "./select_runtime";
import SelectAge from "./select_age";
import Results from "./results";

function SelectionSequence() {
  const [current, set_current] = useState("genre");

  const [genre, set_genre] = useState([]);
  const [year, set_year] = useState([]);
  const [runtime, set_runtime] = useState([]);
  const [age, set_age] = useState([]);

  const [results, set_results] = useState([]);
  const [error, set_error] = useState("");

  const generate_results = () => {
    const preferences = { genre, year, runtime, age };
    console.log(preferences);

    fetch("api/get_movie_recommendations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(preferences),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        set_results(data);
      })
      .catch((err) => {
        console.log(err.message);
        set_error(err);
      });
    set_current("results");
  };

  return (
    <div>
      {/* Selection Pages */}
      {current === "genre" && (
        <SelectGenre element={genre} set_element={set_genre} />
      )}
      {current === "year" && (
        <SelectYear element={year} set_element={set_year} />
      )}
      {current === "runtime" && (
        <SelectRuntime element={runtime} set_element={set_runtime} />
      )}
      {current === "age" && <SelectAge element={age} set_element={set_age} />}

      {current === "results" && <Results data={results} error={error} />}

      {/* Next Buttons */}
      {genre.length != 0 && current === "genre" && (
        <button
          className="next-button"
          onClick={() => {
            set_current("year");
          }}
        >
          Next
        </button>
      )}
      {year.length != 0 && current === "year" && (
        <button
          className="next-button"
          onClick={() => {
            set_current("runtime");
          }}
        >
          Next
        </button>
      )}
      {runtime.length != 0 && current === "runtime" && (
        <button
          className="next-button"
          onClick={() => {
            set_current("age");
          }}
        >
          Next
        </button>
      )}
      {age.length != 0 && current === "age" && (
        <button
          className="next-button"
          onClick={() => {
            generate_results();
          }}
        >
          Generate Recommendations
        </button>
      )}

      {/* Testing... */}

      <p className="test">{genre}</p>
      <p className="test">{year}</p>
      <p className="test">{runtime}</p>
      <p className="test">{age}</p>
    </div>
  );
}

export default SelectionSequence;
