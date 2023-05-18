import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

import Signup from "../SignupFunctional";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test the Register Component", () => {
  it("Page renders correctly.", () => {
    act(() => {
      render(
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      );
    });
    expect(screen.getByRole("heading")).toHaveTextContent("Signup");

    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirmpassword")).toBeInTheDocument();
  });

  it("Fetch is called on correctly validated submit.", async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      );
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
        target: { value: "Password1!" }
      });
      fireEvent.click(submit);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it("Fetch is not called on unvalidated submit.", async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      );
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
        target: { value: "Password1" }
      });
      fireEvent.click(submit);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(0);
    });
  });
});
