import "@testing-library/jest-dom";

import { LoginForm } from "../Login";
import { SignUpForm } from "../Signup";

// Only way I could get it to work with class components
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test the logout component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LoginForm></LoginForm>);
    // If some weird error occurs because of the wrappers, remove this line below.
    wrapper = shallow(<SignUpForm></SignUpForm>);
  });
  test("When user is signed in, logout button appears", () => {
    // Test if user is logged in or signed in

    wrapper.setState({ isLoggedin: true });
    const LoggedIn = wrapper.instance().state.isLoggedin;
    expect(LoggedIn).toBe(true);
  });

  test("When user clicks logout, they are logged out of the website", () => {
    // Set logged in state to false.
    wrapper.setState({ isLoggedin: false });
    const LoggedIn = wrapper.instance().state.isLoggedin;
    expect(LoggedIn).toBe(false);
  });
});
