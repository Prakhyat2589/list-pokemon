import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import getResponse from "./helper/getresponse";
import PokemonDetails from "./components/PokemonDetails";
import PokemonCardDetail from "./components/PokemonCardDetail";

function App() {
  const [pokemonDataList, setPokemonDataList] = useState([]);

  const fetchData = async () => {
    const res = await getResponse();
    setPokemonDataList(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {pokemonDataList && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <PokemonDetails dataList={pokemonDataList} />
            </Route>

            <Route exact path="/pokemon/:name">
              <PokemonCardDetail />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}
export default App;
