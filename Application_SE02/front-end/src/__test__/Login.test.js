import "@testing-library/jest-dom";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";

import Login from "../LoginFunctional";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test the Login Component", () => {
  test("Page renders correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Login");
    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });

  test("Username field should have correct input.", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const UsernameInput = screen.getByPlaceholderText("Username");
    expect(UsernameInput).toHaveAttribute("type", "text");
  });

  test("Password field should have correct input.", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const PasswordInput = screen.getByPlaceholderText("Password");
    expect(PasswordInput).toHaveAttribute("type", "password");
  });
});
