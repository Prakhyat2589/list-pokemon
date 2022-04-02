import React from "react";
import { render, cleanup } from "@testing-library/react";
import TestRenderer from "react-test-renderer";

import App from "./App";
import axios from "axios";
const { act } = TestRenderer;
jest.mock("axios");

afterEach(cleanup);
describe("Main component renter with children", () => {
  it("fetches and displays data", async () => {
    // We'll be explicit about what data Axios is to return when `get` is called.
    axios.get.mockResolvedValueOnce({
      data: {
        count: 1118,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      },
    });

    const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    let container;
    act(() => {
      container = render(<App />);
      expect(container).toMatchSnapshot();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});
