
//import {useState} from 'react';
import React, { Component } from 'react';

class SignUpForm extends Component {

  
state = {
  username: '',
  email: '',
  password: '',
  confirmpassword: '',
  InfoErrors: {},
}


handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
  
}

 handleSubmit = (event) => {
  event.preventDefault()
  if (this.FormValidation()) {
   console.log(this.state);  
  }
};

 FormValidation = () => {
  let InfoErrors = {}
  let ValidInfo = true

  if (!this.state.email) {
      ValidInfo = false
      InfoErrors['email'] = 'Please enter a valid email.'

  } else if (this.state.email) {
      if (!this.state.email.match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)) {
          ValidInfo = false
          InfoErrors['email'] = 'Email is not valid (must be ex. x@y.com).'
      }
  }

  if (!this.state.username) {
      ValidInfo = false
      InfoErrors['username'] = 'Please enter a valid username.'
  } else if (this.state.username) {
      if (!this.state.username.match(/^[A-Za-z][A-Za-z0-9]+$/)) {
          ValidInfo = false
          InfoErrors['username'] = 'Username must begin with an alphanumeric character.'
      } else {
          if (!this.state.username.match(/^[A-Za-z]\w{2,20}$/)) {
              ValidInfo = false
              InfoErrors['username'] = 'Username must contain at least 3 alphanumeric characters.'
          }
      }
  }

  if (!this.state.password) {
      ValidInfo = false
      InfoErrors['password'] = 'Please enter a valid password.'
    } else if (this.state.password) {
      if (!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
        ValidInfo = false
        InfoErrors['password'] = 'Password must be at least 8 characters and contain 1 letter, 1 number and a symbol.'
      }
    }

    if (!this.state.confirmpassword) {
      ValidInfo = false
      InfoErrors['confirmpassword'] = 'Please confirm your password.'
    } else if (this.state.confirmpassword) {
        if (this.state.confirmpassword !== this.state.password) {
          ValidInfo = false
          InfoErrors['confirmpassword'] = 'Passwords do not match.'
        }
    }

    this.setState({ InfoErrors })
    return ValidInfo
  }

   render () {
   
    const { username, email, password, confirmpassword } = this.state;

    //console.log(InfoErrors);
    return (
        <div className="SignUp_Main_Div">
            <form name = "Signup_Form" onSubmit = {this.handleSubmit} >
                <div className="SignUp_Container">
                    <div className="SignUp_Container_Border">
                        <label className="SignUp_Email">Email</label> 
                        <input className="LoginRegisterInputFields" type="email" id="email" placeholder="Email" 
                        name='email'
                        value={email}
                        onChange = {this.handleChange}
                       />
                        <div className="ErrorMessage">{this.state.InfoErrors.email}</div>
                        <br/>

                        <label className="SignUp_Username">Username</label>
                        <input className="LoginRegisterInputFields" type="text" id="Username" placeholder="Username" 
                        name='username'
                        value={username}
                        onChange = {this.handleChange}
                        />
                        <div className="ErrorMessage">{this.state.InfoErrors.username}</div>
                        <br/>

                        <label className="SignUp_Password">Password</label> 
                        <input className="LoginRegisterInputFields" type="password" id="Password" placeholder="Password" 
                        name='password'
                        value={password}
                        onChange = {this.handleChange}
                        />
                        <div className="ErrorMessage">{this.state.InfoErrors.password}</div>
                        <br/>

                        <label className="SignUp_ConfirmPassword">Confirm Password</label>
                        <input className="LoginRegisterInputFields" type="password" id="ConfirmPassword" placeholder="Confirm Password" 
                        name='confirmpassword'
                        value={confirmpassword}
                        onChange = {this.handleChange}
                        /> 
                        <div className="ErrorMessage">{this.state.InfoErrors.confirmpassword}</div>
                        <br/>
                        <input type="submit" className="SignUp_Button" value="Sign Up" /> 
                    </div> 
                </div>
            </form>
        </div>
    );
  }
}
 

export default SignUpForm;


