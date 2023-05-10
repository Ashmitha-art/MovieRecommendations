import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SelectGenre from "./select_genre";
import SelectYear from "./select_year";
import SelectRuntime from "./select_runtime";
import SelectAge from "./select_age";
import Results from "./results";

/**

A component that allows users to select preferences for movie recommendations and generates the recommendations.
@returns {JSX.Element} The SelectionSequence component.
*/
const SelectionSequence = () => {
  const [current, set_current] = useState("genre");

  const [genre, set_genre] = useState([]);
  const [year, set_year] = useState([]);
  const [runtime, set_runtime] = useState([]);
  const [age, set_age] = useState([]);

  const [data, set_data] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  let navigate = useNavigate();

  const routeChange = (route) => {
    let path = "/" + route;
    navigate(path);
  };

  /**

  Sends the user's preferences to the server to generate movie recommendations.
  */
  const generate_results = () => {
    const preferences = { genre, year, runtime, age };

    const abort_controller = new AbortController();

    fetch("api/get_movie_recommendations/", {
      signal: abort_controller.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
        // Include the CSRF token in the headers
        "X-CSRFToken":
          document.cookie
            .match("(^|;)\\s*" + "csrftoken" + "\\s*=\\s*([^;]+)")
            ?.pop() || ""
      },
      body: JSON.stringify(preferences)
    })
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch data.");
        return res.json();
      })
      .then((data) => {
        set_data(data);
        set_loading(false);
        set_error(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") console.log("Fetch was aborted.");
        else {
          set_error(err);
          set_loading(false);
        }
      });
    set_current("results");
    return () => abort_controller.abort();
  };

  return (
    <div>
      {!localStorage.getItem("token") && (
        <div className="LoginTicket">
          <p className="heading-2">You are not currently logged in.</p>
          <button
            className="get-started"
            onClick={() => {
              routeChange("");
            }}
          >
            Back to Home
          </button>
        </div>
      )}

      {localStorage.getItem("token") && (
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
          {current === "age" && (
            <SelectAge element={age} set_element={set_age} />
          )}

          {current === "results" && (
            <Results data={data} loading={loading} error={error} />
          )}

          {/* Genre Page Next Button */}
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

          {/* Year Page Back & Next Buttons */}
          <div className="home-page-container">
            {current === "year" && (
              <button
                className="next-button"
                onClick={() => {
                  set_current("genre");
                  set_genre([]);
                  set_year([]);
                }}
              >
                Back
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
          </div>

          {/* Runtime Page Back & Next Buttons */}
          <div className="home-page-container">
            {current === "runtime" && (
              <button
                className="next-button"
                onClick={() => {
                  set_current("year");
                  set_year([]);
                  set_runtime([]);
                }}
              >
                Back
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
          </div>

          {/* Age Rating Page Back & Next Buttons*/}
          <div>
            {current === "age" && (
              <button
                className="next-button"
                onClick={() => {
                  set_current("runtime");
                  set_runtime([]);
                  set_age([]);
                }}
              >
                Back
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
          </div>

          {/* Testing... */}

          <p className="test">{genre}</p>
          <p className="test">{year}</p>
          <p className="test">{runtime}</p>
          <p className="test">{age}</p>
        </div>
      )}
    </div>
  );
};

export default SelectionSequence;
