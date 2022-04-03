import React from "react";
import { render, cleanup } from "@testing-library/react";

import App from "../../App";
import PokemonDetails from "../PokemonDetails";
import axios from "axios";
import TestRenderer from "react-test-renderer";
import mockdata from "./testData.json";
const { act } = TestRenderer;
jest.mock("axios");

afterEach(cleanup);
let container;

let dataList = [
  "https://pokeapi.co/api/v2/pokemon/1/",
  "https://pokeapi.co/api/v2/pokemon/2/",
];

afterEach(cleanup);
describe("Main component renter with children", () => {
  it("fetches and displays data", async () => {
    // We'll be explicit about what data Axios is to return when `get` is called.
    await axios.get.mockResolvedValueOnce({
      data: {
        count: 1118,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        ],
      },
    });

    const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    await axios.get.mockResolvedValueOnce({
      data: { mockdata },
    });

    container = await render(
      <App>
        <PokemonDetails dataList={dataList} />
      </App>
    );
    await expect(container).toMatchSnapshot();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});
