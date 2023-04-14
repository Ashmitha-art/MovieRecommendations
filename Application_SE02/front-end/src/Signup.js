//import {useState} from 'react';
import React, { Component } from "react";

//const { username, email, password, confirmpassword } = this.state;

class SignUpForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    InfoErrors: {},
  };

  //const { username, email, password, confirmpassword } = this.state;

  //EEj23`~ull1

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Post Request
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.SignupValidation()) {
      console.log(this.state.email);
      console.log(this.state.username);
      console.log(this.state.password);
      console.log(this.state.confirmpassword);

      const userInfo = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        confirmpassword: this.state.confirmpassword,
      };

      const userPost = {
        method: "POST",
        body: JSON.stringify(userInfo),
      };

      fetch("/signup", userPost)
        .then((res) => res.json())
        .catch((event) => console.log(event));
    }
  };
  SignupValidation = () => {
    let InfoErrors = {};
    let ValidAccountInfo = true;

    if (!this.state.email) {
      ValidAccountInfo = false;
      InfoErrors["email"] = "Please enter a valid email.";
    } else if (this.state.email) {
      if (
        !this.state.email.match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)
      ) {
        ValidAccountInfo = false;
        InfoErrors["email"] = "Email is not valid (must be ex. x@y.com).";
      }
    }

    if (!this.state.username) {
      ValidAccountInfo = false;
      InfoErrors["username"] = "Please enter a valid username.";
    } else if (this.state.username) {
      if (!this.state.username.match(/^[A-Za-z][A-Za-z0-9]+$/)) {
        ValidAccountInfo = false;
        InfoErrors["username"] =
          "Username must begin with an alphanumeric character.";
      } else {
        if (!this.state.username.match(/^[A-Za-z]\w{2,20}$/)) {
          ValidAccountInfo = false;
          InfoErrors["username"] =
            "Username must contain at least 3 alphanumeric characters.";
        }
      }
    }

    if (!this.state.password) {
      ValidAccountInfo = false;
      InfoErrors["password"] = "Please enter a valid password.";
    } else if (this.state.password) {
      if (
        !this.state.password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        )
      ) {
        ValidAccountInfo = false;
        InfoErrors["password"] =
          "Password must be at least 8 characters and contain 1 letter, 1 number and a symbol.";
      }
    }

    if (!this.state.confirmpassword) {
      ValidAccountInfo = false;
      InfoErrors["confirmpassword"] = "Please confirm your password.";
    } else if (this.state.confirmpassword) {
      if (this.state.confirmpassword !== this.state.password) {
        ValidAccountInfo = false;
        InfoErrors["confirmpassword"] = "Passwords do not match.";
      }
    }

    this.setState({ InfoErrors });
    return ValidAccountInfo;
  };

  render() {
    const { username, email, password, confirmpassword } = this.state;

    //console.log(InfoErrors);
    return (
      <div className="SignUp_Main_Div">
        <form name="Signup_Form" onSubmit={this.handleSubmit}>
          <div className="SignUp_Container">
            <div className="SignUp_Container_Border">
              <label className="SignUp_Email">Email</label>
              <input
                className="LoginRegisterInputFields"
                type="email"
                id="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              <div className="ErrorMessage">{this.state.InfoErrors.email}</div>
              <br />

              <label className="SignUp_Username">Username</label>
              <input
                className="LoginRegisterInputFields"
                type="text"
                id="Username"
                placeholder="Username"
                required
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <div className="ErrorMessage">
                {this.state.InfoErrors.username}
              </div>
              <br />

              <label className="SignUp_Password">Password</label>
              <input
                className="LoginRegisterInputFields"
                type="password"
                id="Password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <div className="ErrorMessage">
                {this.state.InfoErrors.password}
              </div>
              <br />

              <label className="SignUp_ConfirmPassword">Confirm Password</label>
              <input
                className="LoginRegisterInputFields"
                type="password"
                id="ConfirmPassword"
                placeholder="Confirm Password"
                required
                name="confirmpassword"
                value={confirmpassword}
                onChange={this.handleChange}
              />
              <div className="ErrorMessage">
                {this.state.InfoErrors.confirmpassword}
              </div>
              <br />
              <input type="submit" className="SignUp_Button" value="Sign Up" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
