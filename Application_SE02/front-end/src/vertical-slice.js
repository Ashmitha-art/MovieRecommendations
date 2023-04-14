import Fetch from "./Fetch.js";
import { useState } from "react";

function VerticalSlice({ url, contents }) {
  const { data, error } = Fetch(url);

  const [filteredData, setFilteredData] = useState(data);

  function handleSearch(e) {
    let val = e.target.value;
    let result = [];
    result = data.filter((d) => {
      return d.title.search(val) != -1;
    });
    setFilteredData(result);
  }

  // This is bad but it's a vertical slice so it's going to be removed at some point anyways.
  return (
    <div className="vertical-slice">
      <h2>MOVIES</h2>

      <div className="home-page-search">
        <input
          className="home-page-search-input"
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {filteredData &&
        filteredData.map((data) => (
          <div className="movies-table" key={data.id}>
            <p>
              Movie ID: {data.id}, Movie Title: {data.title}, Alt Title:{" "}
              {data.alt_title}, Year: {data.year}, Runtime: {data.runtime}
            </p>
          </div>
        ))}
      {error && <div>{error}</div>}
    </div>
  );
}

export default VerticalSlice;
