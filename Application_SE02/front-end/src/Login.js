import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    InfoErrors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.SignupValidation()) {
      console.log(this.state.username);
      console.log(this.state.password);

      const userInfo = {
        username: this.state.username,
        password: this.state.password,
      };

      const userPost = {
        method: "POST",
        body: JSON.stringify(userInfo),
      };

      fetch("/login", userPost)
        .then((res) => res.json())
        .catch((event) => console.log(event));
    }
  };

  SignupValidation = () => {
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
    const { username, password } = this.state;

    return (
      <div className="Login_Main_Div">
        <form name="Login_Form" onSubmit={this.handleSubmit}>
          <div className="Login_Container">
            <div className="Login_Container_Border">
              <label className="Login_Username">Username</label>
              <input
                className="LoginRegisterInputFields"
                type="text"
                id="username"
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <div className="ErrorMessage">
                {this.state.InfoErrors.username}
              </div>
              <br />

              <label className="Login_Password">Password</label>
              <input
                className="LoginRegisterInputFields"
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <div className="ErrorMessage">
                {this.state.InfoErrors.password}
              </div>
              <br />

              <a className="Forgot_Password" href="/">
                Forgot Password?
              </a>
              <br />
              <input type="submit" className="Login_Button" value="Log In" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
