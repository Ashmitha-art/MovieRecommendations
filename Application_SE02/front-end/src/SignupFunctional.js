import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
A component for a signup form.
@returns {JSX.Element} The Signup component.
*/
const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validationErrors, setValidationErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  /**
  Handles form submission by making a POST request to the server with user's input data.
  @param {Event} event - The form submit event object.
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (signupValidation()) {
      const user = { email, username, password };

      fetch("api/register/", {
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
          if (data.username === "This field must be unique.") {
            setBackendError("This username is taken.");
          } else {
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.user.id);
            setIsLoggedIn(true);
            setBackendError(null);
          }
        })
        .catch((err) => {
          setBackendError(err.message);
          console.log(err);
        });
      if (isLoggedIn) navigate("/");
    }
  };

  /**
  Validates user input data and updates the component state with error messages, if any.
  @returns {boolean} - Returns true if the input data is valid, false otherwise.
  */
  const signupValidation = () => {
    let infoErrors = {};
    let isValid = true;

    // Email validation.
    if (!email) {
      isValid = false;
      infoErrors["email"] = "Please enter a valid email.";
    } else if (email) {
      if (!email.match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)) {
        isValid = false;
        infoErrors["email"] = "Email is not valid (must be ex. x@y.com).";
      }
    }

    // Username validation.
    if (!username) {
      isValid = false;
      infoErrors["username"] = "Please enter a valid username.";
    } else if (username) {
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
    }

    // Password Validation.
    if (!password) {
      isValid = false;
      infoErrors["password"] = "Please enter a valid password.";
    } else if (password) {
      if (
        !password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
        )
      ) {
        isValid = false;
        infoErrors["password"] =
          "Password must be at least 8 characters and contain 1 letter, 1 number, and a symbol.";
      }
    }

    // Confirm Password Validation.
    if (!confirmPassword) {
      isValid = false;
      infoErrors["confirmpassword"] = "Please confirm your password.";
    } else if (confirmPassword) {
      if (confirmPassword !== password) {
        isValid = false;
        infoErrors["confirmpassword"] = "Passwords do not match.";
      }
    }

    setValidationErrors(infoErrors);
    return isValid;
  };

  return (
    <div className="SignUp_Main_Div">
      <h1 className="heading">Signup</h1>
      <form name="Signup_Form">
        <div className="SignUp_Container">
          <label className="SignUp_Email">Email</label>
          <input
            className="LoginRegisterInputFields"
            data-testid="email"
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="ErrorMessage">{validationErrors.email}</div>
          <br />

          <label className="SignUp_Username">Username</label>
          <input
            className="LoginRegisterInputFields"
            data-testid="username"
            type="text"
            id="Username"
            placeholder="Username"
            required
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div className="ErrorMessage">{validationErrors.username}</div>
          <br />

          <label className="SignUp_Password">Password</label>
          <input
            className="LoginRegisterInputFields"
            data-testid="password"
            type="password"
            id="Password"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="ErrorMessage">{validationErrors.password}</div>
          <br />

          <label className="SignUp_ConfirmPassword">Confirm Password</label>
          <input
            className="LoginRegisterInputFields"
            data-testid="confirmpassword"
            type="password"
            id="ConfirmPassword"
            placeholder="Confirm Password"
            required
            name="confirmpassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <div className="ErrorMessage">{validationErrors.confirmpassword}</div>
          <br />
          <button
            onClick={handleSubmit}
            data-testid="submit"
            className="SignUp_Button"
          >
            Sign up
          </button>
        </div>
      </form>

      {backendError && <div className="ErrorMessage">{backendError}</div>}
    </div>
  );
};

export default Signup;
