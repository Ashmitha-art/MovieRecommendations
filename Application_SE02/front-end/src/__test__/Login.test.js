import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";


import Login from "../LoginFunctional";
import loginValidation from "../LoginFunctional";

beforeEach(() => {
    fetch.resetMocks();
  });
  

describe("Test the Login Component", () => {
    
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
        const TestInvalidUsername = loginValidation(false);
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

    /*
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
