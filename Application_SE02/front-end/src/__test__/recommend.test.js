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
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test the Recommendation Component", () => {
  it("Test 'select_genre' page.", () => {
    render(<SelectGenre />);
    expect(screen.getByText("Let's get started!")).toBeInTheDocument();
  });

  it("Test 'select_year' page.", () => {
    render(<SelectYear />);

    expect(screen.getByText("Nice! Let's continue!")).toBeInTheDocument();
  });

  it("Test 'select_runtime.' page", () => {
    render(<SelectRuntime />);
    expect(screen.getByText("Almost done!")).toBeInTheDocument();
  });

  it("Test 'select_age' page.", () => {
    render(<SelectAge />);
    expect(screen.getByText("Moment of truth!")).toBeInTheDocument();
  });

  it("Test 'results' page.", () => {
    const results = [
      {
        movie_title: "movie",
        genres: ["genre 1", "genre 2", "genre 3"],
        year: "1234",
        runtime: "567",
        age_rating: "a"
      }
    ];

    render(<Results data={results} error={null} />);
    expect(screen.getByText("movie")).toBeInTheDocument();
    expect(screen.getByText("1234 | 567 Minutes | a")).toBeInTheDocument();
    expect(screen.getByText("genre 1")).toBeInTheDocument();
    expect(screen.getByText("genre 2")).toBeInTheDocument();
    expect(screen.getByText("genre 3")).toBeInTheDocument();
  });

  it("Test recommendation process", async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Recommend />
        </BrowserRouter>
      );
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
