import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SelectGenre from "./select_genre";
import SelectYear from "./select_year";
import SelectRuntime from "./select_runtime";
import SelectAge from "./select_age";
import Results from "./results";

/**
A component that allows users to select preferences for movie recommendations and generates the recommendations.
@returns {JSX.Element} The Recommend component.
*/
const Recommend = () => {
  const [current, set_current] = useState("genre");

  const [genreList, set_genre] = useState([]);
  const [yearList, set_year] = useState([]);
  const [runtimeList, set_runtime] = useState([]);
  const [ageList, set_age] = useState([]);

  const [data, set_data] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  let navigate = useNavigate();

  /**

  Sends the user's preferences to the server to generate movie recommendations.
  */
  const generate_results = () => {
    let genre = "";
    genreList.sort();
    genreList.map((x, i) => {
      if (i < genreList.length - 1) genre = genre.concat(String(x), ", ");
      else genre = genre.concat(String(x));
    });

    let year = "";
    yearList.sort();
    yearList.map((x, i) => {
      if (i < yearList.length - 1) year = year.concat(String(x), ", ");
      else year = year.concat(String(x));
    });

    let runtime = "";
    runtimeList.sort();
    runtimeList.map((x, i) => {
      if (i < runtimeList.length - 1)
        runtime = runtime.concat(String(x), " Minutes, ");
      else runtime = runtime.concat(String(x), " Minutes");
    });

    let age = "";
    ageList.map((x, i) => {
      if (i < ageList.length - 1) age = age.concat(String(x), ", ");
      else age = age.concat(String(x));
    });

    const preferences = { genre, year, runtime, age };

    fetch("api/get_movie_recommendations/", {
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
  };

  return (
    <div>
      {!localStorage.getItem("token") && (
        <div className="LoginTicket">
          <p className="heading-2">You are not currently logged in.</p>
          <button
            className="get-started"
            onClick={() => {
              navigate("/");
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
            <SelectGenre element={genreList} set_element={set_genre} />
          )}
          {current === "year" && (
            <SelectYear element={yearList} set_element={set_year} />
          )}
          {current === "runtime" && (
            <SelectRuntime element={runtimeList} set_element={set_runtime} />
          )}
          {current === "age" && (
            <SelectAge element={ageList} set_element={set_age} />
          )}

          {current === "results" && (
            <Results data={data} loading={loading} error={error} />
          )}

          {/* Genre Page Next Button */}
          {genreList.length != 0 && current === "genre" && (
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
            {yearList.length != 0 && current === "year" && (
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
            {runtimeList.length != 0 && current === "runtime" && (
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
            {ageList.length != 0 && current === "age" && (
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
        </div>
      )}
    </div>
  );
};

export default Recommend;
