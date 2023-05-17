import "@testing-library/jest-dom";
import { render } from "@testing-library/react";


import Login from "../LoginFunctional";
//import Signup from "../SignupFunctional";

// Only way I could get it to work with class components
/*import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  fetch.resetMocks();
});
*/
describe("Test the logout component", () => {
    /*let wrapper;
    beforeEach(() => {
    wrapper = shallow(<Login />);
    // If some weird error occurs because of the wrappers, remove this line below.
    wrapper = shallow(<Signup />);

  });*/
  
  test("When user is signed in, logout button appears", () => {
  
    // Test if user is logged in or signed in
    const LoggedIn = render(<Login />);
    //const SignedIn = wrapper.instance().state.isLoggedin;
    LoggedIn.getByText("Logout") // Test that Logout is present in the DOM
    //expect(LoggedIn).toBe(true);
    //expect(SignedIn).toBe(true);

  });

  
  /*test("When user clicks logout, they are logged out of the website", () => {
    // Set logged in state to false.
    wrapper.setState({ isLoggedin: false });
    const LoggedIn = wrapper.instance().state.isLoggedin;
    expect(LoggedIn).toBe(false);
  });*/
  
});
