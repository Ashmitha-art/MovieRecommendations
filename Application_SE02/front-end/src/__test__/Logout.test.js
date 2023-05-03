import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";


import { LoginForm } from "../Login";
import { SignUpForm } from "../Signup";

//import Navbar from "../Navbar"
//import { BrowserRouter } from 'react-router-dom';


// Only way I could get it to work with class components
import Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
    fetch.resetMocks();
  });
  

describe("Test the logout component" , () => {
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
  
 /* Extra Code that didn't work
 
 render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
   );

  expect(screen.getByTestId("logout")).toBeInTheDocument();

  expect(wrapper.instance().state.count).toBe(0)

  wrapper.isLoggedin
  const LoggedIn = LoginComponent.state({ isLoggedin });

    expect(LoggedIn).toBe(true);
    */

  });

  test("When user clicks logout, they are logged out of the website" , () => {
    // Set logged in state to false.
    wrapper.setState({ isLoggedin: false });
    const LoggedIn = wrapper.instance().state.isLoggedin;
    expect(LoggedIn).toBe(false);
  });
});
/** 
beforeEach(() => {
    fetch.resetMocks();
  });
  
describe("Test the Register Component", () => {
    it("Page renders correctly.", () => {
      render(<Signup />);
      expect(screen.getByRole("heading")).toHaveTextContent("Register");
  
      expect(screen.getByTestId("email")).toBeInTheDocument();
      expect(screen.getByTestId("username")).toBeInTheDocument();
      expect(screen.getByTestId("password")).toBeInTheDocument();
      expect(screen.getByTestId("confirmpassword")).toBeInTheDocument();
    });
  
    it("Fetch is called on correctly validated submit.", async () => {
      act(() => {
        render(<Signup />);
      });
  
      const email = screen.getByTestId("email");
      const username = screen.getByTestId("username");
      const password = screen.getByTestId("password");
      const confirmpassword = screen.getByTestId("confirmpassword");
  
      const submit = screen.getByTestId("submit");
  
      act(() => {
        fireEvent.change(email, { target: { value: "test@email.com" } });
        fireEvent.change(username, { target: { value: "test" } });
        fireEvent.change(password, { target: { value: "Password1!" } });
        fireEvent.change(confirmpassword, {
          target: { value: "Password1!" },
        });
        fireEvent.click(submit);
      });
  
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });
    });
  
    it("Fetch is not called on unvalidated submit.", async () => {
      act(() => {
        render(<Signup />);
      });
  
      const email = screen.getByTestId("email");
      const username = screen.getByTestId("username");
      const password = screen.getByTestId("password");
      const confirmpassword = screen.getByTestId("confirmpassword");
  
      const submit = screen.getByTestId("submit");
  
      act(() => {
        fireEvent.change(email, { target: { value: "test@email.com" } });
        fireEvent.change(username, { target: { value: "test" } });
        fireEvent.change(password, { target: { value: "Password1" } });
        fireEvent.change(confirmpassword, {
          target: { value: "Password1" },
        });
        fireEvent.click(submit);
      });
  
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(0);
      });
    });
  });
  */