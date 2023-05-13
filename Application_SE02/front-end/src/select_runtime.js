import { useState } from "react";

import hourglass1_logo from "./photos/LogosandIcons/Hourglass1.png";
import hourglass2_logo from "./photos/LogosandIcons/Hourglass2.png";
import hourglass3_logo from "./photos/LogosandIcons/Hourglass3.png";
import hourglass4_logo from "./photos/LogosandIcons/Hourglass4.png";
import hourglass5_logo from "./photos/LogosandIcons/Hourglass5.png";

/** Constants to define buttons and images. */
const linenum = 5;


/**

SelectRuntime component that displays a list of runtime options to select from.
@param {Object} element - The state of the selected runtime options.
@param {Function} set_element - The function to update the state of the selected runtime options.
@returns {JSX.Element} - The JSX code to render the SelectRuntime component.
*/
function SelectRuntime({ element, set_element }) {
  const runtime_limit = 5;
  const [runtime_num, set_runtime_num] = useState(0);
  /**

  An array of runtime options with their name, description, and selection state.
  @type {Object[]}
  */
  const [runtimes, set_runtimes] = useState([
    {
      runtime: "Short",
      desc: "Under 90",
      photo: hourglass1_logo,
      state: false
    },
    {
      runtime: "Reasonable",
      desc: "90 to 120",
      photo: hourglass2_logo,
      state: false
    },
    {
      runtime: "Long",
      desc: "120 to 150",
      photo: hourglass3_logo,
      state: false
    },
    {
      runtime: "Epic",
      desc: "150 to 180",
      photo: hourglass4_logo,
      state: false
    },
    {
      runtime: "Eternity",
      desc: "Over 180",
      photo: hourglass5_logo,
      state: false
    }
  ]);

  /**

  The function to handle the clicking of a runtime option.
  @param {string} runtime - The name of the runtime option that was clicked.
  */
  function handle_click(runtime) {
    /**
    
    * The function to add a runtime option to the selected options.
    * @param {string} x - The name of the runtime option to add.
    */
    function add_runtime(x) {
      set_element((element) => [...element, x]);
      set_runtime_num(runtime_num + 1);
    }

    /**
    
    * The function to remove a runtime option from the selected options.
    * @param {string} x - The name of the runtime option to remove.
    */
    function remove_runtime(x) {
      set_element(
        element.filter((runtime) => {
          return runtime !== x;
        })
      );
      set_runtime_num(runtime_num - 1);
    }

    /**
     
    * The updated array of runtime options with the selected state modified.
    * @type {Object[]}
    */
    const new_runtimes = runtimes.map((x) => {
      if (x.desc === runtime) {
        if (x.state) {
          remove_runtime(runtime);
          return { ...x, state: false };
        } else {
          if (runtime_num < runtime_limit) {
            add_runtime(runtime);
            return { ...x, state: true };
          }
          return x;
        }
      } else {
        return x;
      }
    });

    set_runtimes(new_runtimes);
  }

  


  return (
    <div>
      <h2 className="heading">
        3: Select a Runtime Range (Up to {runtime_limit})
      </h2>
      <div className="runtime-button-container">
        <div className="runtime-timeline-background">
          <div className="runtime-timeline-image">
            {[...Array(linenum)].map((i) =>  
              <span className="runtime-timeline-lines" key={i}></span>
            )}
          </div>

        {runtimes.map((element, index) => (
          <label
            key={index}
            className={`runtime-button-${element.state ? "on" : "off"}`}
          >
            <input
              key={element.desc}
              className="runtime-button-checkbox"
              type="checkbox"
              onClick={() => {
                handle_click(element.desc);
              }}
            />
          
            <img 
              key={element.photo}
              className="runtime-button-img" 
              src={element.photo}
              alt={element.title}
            />
            
            <p 
              
              className="runtime-button-text">
              {element.runtime}
              <br />
            </p>
            <p
              key={index}
              className="runtime-button-desc-text">
              {element.desc} Minutes
            </p>
          </label>
        ))}
        </div>
      </div>
    </div>
  );
}

export default SelectRuntime;
