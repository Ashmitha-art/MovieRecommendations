import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
A component for a login form.
@returns {JSX.Element} The Login component.
*/
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginValidation()) {
      let user = { username, password };

      fetch("api/login/", {
        method: "POST",
        headers: {
          // Include the CSRF token in the headers
          "X-CSRFToken":
            document.cookie
              .match("(^|;)\\s*" + "csrftoken" + "\\s*=\\s*([^;]+)")
              ?.pop() || ""
        },
        body: JSON.stringify(user)
      })
        .then((res) => {
          if (!res.ok) throw Error("Could not post data.");
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user.id);
        })
        .catch((err) => {
          console.log(err.message);
        });
      //navigate("/");
    }
  };

  /**
  Validates the input fields for the login form.
  @returns {boolean} - A flag indicating if the inputs are valid.
  */
  const loginValidation = () => {
    let infoErrors = {};
    let isValid = true;

    // Username validation.
    if (!username.match(/^[A-Za-z][A-Za-z0-9]+$/)) {
      isValid = false;
      infoErrors["username"] =
        "Username must begin with an alphanumeric character.";
    } else {
      if (!username.match(/^[A-Za-z]\w{2,20}$/)) {
        isValid = false;
        infoErrors["username"] =
          "Username must contain at least 3 alphanumeric characters.";
      }
    }

    // Password validation.
    if (!password) {
      isValid = false;
      infoErrors["password"] = "Please enter a valid password.";
    } else if (password) {
      if (
        !password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        )
      ) {
        isValid = false;
        infoErrors["password"] =
          "Password must be at least 8 characters and contain 1 letter, 1 number and a symbol.";
      }
    }

    setValidationErrors(infoErrors);
    return isValid;
  };

  return (
    <div className="Login_Main_Div">
      <h1 className="heading">Login</h1>
      <form name="Login_Form">
        <div className="Login_Container">
          <label className="Login_Username">Username</label>
          <input
            className="LoginRegisterInputFields"
            data-testid="username"
            type="text"
            id="Username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div className="ErrorMessage">{validationErrors.username}</div>

          <label className="Login_Password">Password</label>
          <input
            className="LoginRegisterInputFields"
            data-testid="password"
            type="password"
            id="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="ErrorMessage">{validationErrors.password}</div>
          <button
            onClick={handleSubmit}
            data-testid="submit"
            className="Login_Button"
            value="Log In"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
