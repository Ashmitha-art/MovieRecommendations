import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Signup from "./Signup";

it("Renders Correctly", () => {
  render(<Signup />);
  expect(screen.getByRole("heading")).toHaveTextContent("Register");
});
