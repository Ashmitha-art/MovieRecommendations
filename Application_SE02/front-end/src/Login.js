import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    InfoErrors: {},
    isLoggedin: false
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (true) {
      let form_data = new FormData();
      form_data.append("username", this.state.username);
      form_data.append("password", this.state.password);

      fetch("api/login/", {
        method: "POST",
        body: form_data,
        headers: {
          // Include the CSRF token in the headers
          "X-CSRFToken":
            document.cookie
              .match("(^|;)\\s*" + "csrftoken" + "\\s*=\\s*([^;]+)")
              ?.pop() || ""
        }
      })
        .then((res) => {
          if (!res.ok) throw Error("Could not fetch data.");
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
          this.setState({ isLoggedin: true });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  LoginValidation = () => {
    let InfoErrors = {};
    let ValidCredentials = true;

    if (!this.state.username.match(/^[A-Za-z][A-Za-z0-9]+$/)) {
      ValidCredentials = false;
      InfoErrors["username"] =
        "Username must begin with an alphanumeric character.";
    } else {
      if (!this.state.username.match(/^[A-Za-z]\w{2,20}$/)) {
        ValidCredentials = false;
        InfoErrors["username"] =
          "Username must contain at least 3 alphanumeric characters.";
      }
    }

    if (!this.state.password) {
      ValidCredentials = false;
      InfoErrors["password"] = "Please enter a valid password.";
    } else if (this.state.password) {
      if (
        !this.state.password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        )
      ) {
        ValidCredentials = false;
        InfoErrors["password"] =
          "Password must be at least 8 characters and contain 1 letter, 1 number and a symbol.";
      }
    }

    this.setState({ InfoErrors });
    return ValidCredentials;
  };

  render() {
    const { username, password, isLoggedin } = this.state;
    if (isLoggedin) {
      return <Navigate to="/" />;
    }

      return (
          <div className="Login_Main_Div">
            <h1 className="heading">Login</h1>
            <form name="Login_Form" onSubmit={this.handleSubmit}>
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
                    onChange={this.handleChange}
                />
                <div className="ErrorMessage">{this.state.InfoErrors.username}</div>

                <label className="Login_Password">Password</label>
                <input
                    className="LoginRegisterInputFields"
                    data-testid="password"
                    type="password"
                    id="Password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                />
                <div className="ErrorMessage">{this.state.InfoErrors.password}</div>
                {/*
            <a className="Forgot_Password" href="/">
              Forgot Password?
            </a>
            */}
                <button 
                  onClick={this.handleSubmit} 
                  data-testid="submit" 
                  className="Login_Button" 
                  value="Log In">Log In</button>
              </div>
            </form>
          </div>
        </form>
      </div>
    );
  }
}
export default LoginForm;
