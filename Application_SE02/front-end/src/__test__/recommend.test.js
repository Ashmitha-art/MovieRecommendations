import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

import Recommend from "../recommend";
import SelectGenre from "../select_genre";
import SelectYear from "../select_year";
import SelectRuntime from "../select_runtime";
import SelectAge from "../select_age";
import Results from "../results";

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test the Recommendation Component", () => {
  it("Test 'select_genre' page.", () => {
    render(<SelectGenre />);
    expect(screen.getByRole("heading-question-one")).toHaveTextContent("Let's get started!");
  });

  it("Test 'select_year' page.", () => {
    render(<SelectYear />);
    expect(screen.getByRole("heading-question-two")).toHaveTextContent("Nice! Let's continue!");
  });

  it("Test 'select_runtime.' page", () => {
    render(<SelectRuntime />);
    expect(screen.getByRole("heading-question-three")).toHaveTextContent("Almost done!");
  });

  it("Test 'select_age' page.", () => {
    render(<SelectAge />);
    expect(screen.getByRole("heading-question-four")).toHaveTextContent("Moment of truth!");
  });

  it("Test 'results' page.", () => {
    const results = [
      {
        movie_title: "movie",
        year: "1234",
        runtime: "567",
        age_rating: "a"
      }
    ];

    render(<Results data={results} error={null} />);
    expect(screen.getByText("movie")).toBeInTheDocument();
    expect(screen.getByText("1234 | 567 Minutes | a")).toBeInTheDocument();
  });

  it("Test recommendation process", async () => {
    act(() => {
      render(<Recommend />);
    });

    const options1 = ["Action", "Recent", "Short", "PG-13"];

    for (let i = 0; i < 4; i++) {
      act(() => {
        const button = screen.getByText(options1[i]);
        fireEvent.click(button);
      });

      if (i === 3) {
        act(() => {
          const next = screen.getByText("Generate Recommendations");
          fireEvent.click(next);
        });
      } else {
        act(() => {
          const next = screen.getByText("Next");
          fireEvent.click(next);
        });
      }
    }

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
