import axios from "axios";
const getResponse = async () => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
    );
    const { results } = response.data;
    const url = results.map((item) => {
      return item.url;
    });
    return url;
  } catch (e) {
    return null;
  }
};

export default getResponse;
