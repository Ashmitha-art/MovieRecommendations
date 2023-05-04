import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";


import Login, { LoginForm } from "../Login";

// Only way I could get it to work with class components
import Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
    fetch.resetMocks();
  });
  
  //configure({adapter: new Adapter()});

describe("Test the Login Component", () => {
        let wrapper;
        beforeEach(() => {
        wrapper = shallow(<LoginForm></LoginForm>);
    });
    
    test("Page renders correctly", () => {
        render(<Login />);
        expect(screen.getByRole("heading")).toHaveTextContent("Login");
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
       
    });

   /* Not needed? 
   
   test("Username validation should pass with valid username." , () => {
        const LoginInstance1 = wrapper.instance();
        const TestValidUserName = LoginInstance1.LoginValidation();        
        expect(TestValidUserName).toBe(true);
    }); */
  
    test("Username validation should fail with invalid username." , () => {
        const LoginInstance2 = wrapper.instance();
        const TestInvalidUsername = LoginInstance2.LoginValidation(false);
        expect(TestInvalidUsername).not.toBe(true);
    });


    test("Username field should have correct input." , () => {
        render(<Login />);
        const UsernameInput = screen.getByPlaceholderText("Username");
        expect(UsernameInput).toHaveAttribute("type", "text");
    });

    test("Password field should have correct input." , () => {
        render(<Login />);
        const PasswordInput = screen.getByPlaceholderText("Password");
        expect(PasswordInput).toHaveAttribute("type", "password");
    });


    /**
     * 
     * Code from Nathan's portion
    */
 it("Fetch is called on correctly validated submit.", async () => {
    act(() => {
      render(<Login />);
    });

    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");
    const submit = screen.getByTestId("submit");

    act(() => {
      fireEvent.change(username, { target: { value: "test" } });
      fireEvent.change(password, { target: { value: "Password1!" } });
      fireEvent.click(submit);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
  
  /*it("Fetch is not called on unvalidated submit.", async () => {
    act(() => {
      render(<Login />);
    });

    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");
    const submit = screen.getByTestId("submit");

    act(() => {
      fireEvent.change(username, { target: { value: "test" } });
      fireEvent.change(password, { target: { value: "Password" } });
      fireEvent.click(submit);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(0);
    });

  });*/
});
