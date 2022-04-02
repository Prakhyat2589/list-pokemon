import axios from "axios";
import getResponse from "../getResponse";

jest.mock("axios");
const mockApiResposne = {
  data: {
    results: [
      {
        name: "Test1",
        url: "Car1",
      },
      {
        name: "Test2",
        url: "Car2",
      },
      {
        name: "Test2",
        url: "Car3",
      },
    ],
  },
};

describe("fetchData", () => {
  it("fetches successfully data from an API", async () => {
    expect.assertions(1);

    axios.get = jest.fn().mockResolvedValue(mockApiResposne);
    await expect(getResponse()).resolves.toEqual(["Car1", "Car2", "Car3"]);
  });

  it("fetches no data from an API", async () => {
    axios.get = jest.fn().mockResolvedValue(null);
    await expect(getResponse()).resolves.toEqual(null);
  });
});
