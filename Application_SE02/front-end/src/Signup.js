function SignUp() {

    return (
        <div className="SignUp_Main_Div">
            <form name = "Signup_Form">
                <div class="SignUp_Container">
                    <div className="SignUp_Container_Border">
                        <label className="SignUp_Email">Email</label> 
                        <input className="LoginRegisterInputFields" type="email" id="email" placeholder="Email" required/> 
                        <br/>

                        <label className="SignUp_Username">Username</label>
                        <input className="LoginRegisterInputFields" type="text" id="Username" placeholder="Username" required/>
                        <br/>

                        <label className="SignUp_Password">Password</label> 
                        <input className="LoginRegisterInputFields" type="password" id="Password" placeholder="Password" required/> 
                        <br/>

                        <label className="SignUp_ConfirmPassword">Confirm Password</label>
                        <input className="LoginRegisterInputFields" type="password" id="ConfirmPassword" placeholder="Confirm Password" required/> 
                        <br/>
                        <input type="submit" className="SignUp_Button" value="Sign Up"/> 
                    </div> 
                </div>
            </form>


        </div>


    );

}
export default SignUp;
