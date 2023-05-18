import "@testing-library/jest-dom";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor
} from "@testing-library/react";

import Navbar from "../Navbar";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test the logout component", () => {
  test("When user is signed in, logout button appears", () => {
    // Test if user is logged in or signed in
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("When user pressed logout, localstorage is cleared", async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );
    });

    jest.spyOn(localStorage, "removeItem");

    act(() => {
      const button = screen.getByText("Logout");
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalled();
    });
  });
});
