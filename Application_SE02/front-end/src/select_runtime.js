import { useState } from "react";

function SelectRuntime({ element, set_element }) {
  const runtime_limit = 2;
  const [runtime_num, set_runtime_num] = useState(0);
  const [runtimes, set_runtimes] = useState([
    {
      runtime: "Short",
      desc: "Under 90",
      state: false
    },
    {
      runtime: "Reasonable",
      desc: "90 to 120",
      state: false
    },
    {
      runtime: "Long",
      desc: "120 to 150",
      state: false
    },
    {
      runtime: "Epic",
      desc: "150 to 180",
      state: false
    },
    {
      runtime: "Eternity",
      desc: "Over 180",
      state: false
    }
  ]);

  function handle_click(runtime) {
    function add_runtime(x) {
      set_element((element) => [...element, x]);
      set_runtime_num(runtime_num + 1);
    }

    function remove_runtime(x) {
      set_element(
        element.filter((runtime) => {
          return runtime != x;
        })
      );
      set_runtime_num(runtime_num - 1);
    }

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
        {runtimes.map((element, index) => (
          <label
            key={index}
            className={`runtime-button-${element.state ? "on" : "off"}`}
          >
            <input
              className="runtime-button-checkbox"
              type="checkbox"
              onClick={() => {
                handle_click(element.desc);
              }}
            />
            <p className="runtime-button-text">
              {element.runtime}
              <br />
            </p>
            <p className="runtime-button-desc-text">{element.desc} Minutes</p>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SelectRuntime;
