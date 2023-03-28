function Login() {

    return (
        <div className="Login_Main_Div">
            <form name="Login_Form">
                <div class="Login_Container">
                    <div className="Login_Container_Border">
                        <label className="Login_Username">Username</label> 
                        <input className="LoginRegisterInputFields" type="text" id="username" placeholder="Username" required/>
                        <br/>
                        <label className="Login_Password">Password</label>
                        <input className="LoginRegisterInputFields" type="password" id="password" placeholder="Password" required/>
                        <br/>
                        <a className="Forgot_Password" href="/">Forgot Password?</a>
                        <br/>
                        <input type="submit" className="Login_Button" value="Log In"/> 
                    </div>
                </div> 
            </form>
        </div>
    );

}

export default Login;


