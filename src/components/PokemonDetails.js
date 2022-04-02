import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./SearchBox";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import { Wrapper, HeaderComponent, FlexWrapper } from "./style";
import { Button, ButtonGroup, TablePagination } from "@mui/material";
import {
  setSessionStorage,
  getSessionStorage,
} from "../helper/sessionStorageHelper";

const PokemonDetails = ({ dataList }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortStatus, setSortStatus] = useState("asc");

  const asyncForEach = async (array, callback) => {
    for (let i = 0; i < array.length; i++) {
      await callback(array[i], i, array);
    }
  };

  const renderListData = async () => {
    const pokemonList = [];
    try {
      await asyncForEach(dataList, async (url) => {
        const response = await axios.get(url);

        const result = await response.data;
        pokemonList.push(result);
      });
      return pokemonList;
    } catch (e) {
      return null;
    }
  };

  /* istanbul ignore next */
  const handleChange = (e) => {
    setSearch(e.target.value);
    setSessionStorage("searchItem", e.target.value);
  };
  /* istanbul ignore next */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  /* istanbul ignore next */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  /* istanbul ignore next */
  const handleSortByName = () => {
    if (sortStatus === "asc") {
      pokemonData.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setSortStatus("dsc");
    } else if (sortStatus === "dsc") {
      pokemonData.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      setSortStatus("asc");
    }
    setSessionStorage("pokemonData", pokemonData);
  };

  /* istanbul ignore next */
  const handleSortByHeight = () => {
    if (sortStatus === "asc") {
      pokemonData.sort((a, b) => {
        return a.height > b.height ? 1 : -1;
      });
      setSortStatus("dsc");
    } else if (sortStatus === "dsc") {
      pokemonData.sort((a, b) => {
        return a.height < b.height ? 1 : -1;
      });
      setSortStatus("asc");
    }
    setSessionStorage("pokemonData", pokemonData);
  };
  /* istanbul ignore next */
  const handleSortByWeight = () => {
    if (sortStatus === "asc") {
      pokemonData.sort((a, b) => {
        return a.weight > b.weight ? 1 : -1;
      });
      setSortStatus("dsc");
    } else if (sortStatus === "dsc") {
      pokemonData.sort((a, b) => {
        return a.weight < b.weight ? 1 : -1;
      });
      setSortStatus("asc");
    }
    setSessionStorage("pokemonData", pokemonData);
  };

  const PaginationComponent = (
    <TablePagination
      rowsPerPageOptions={[10, 20, 50, { label: "All", value: -1 }]}
      count={pokemonData && pokemonData.length}
      rowsPerPage={rowsPerPage}
      color="primary"
      page={page}
      labelRowsPerPage="Cards per page"
      SelectProps={{
        inputProps: {
          "aria-label": "cards per page",
        },
        native: true,
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={Pagination}
    />
  );

  useEffect(() => {
    let sortedData = getSessionStorage("pokemonData");
    let searchData = getSessionStorage("searchItem");

    const fetchData = async () => {
      if (dataList && dataList.length > 0) {
        const data = await renderListData();
        setPokemonData(data);
        setSessionStorage("pokemonData", data);
      }
    };

    if (sortedData.length > 0) {
      setPokemonData(sortedData);
    } else {
      fetchData();
    }

    if (searchData && searchData.length > 0) {
      setSearch(searchData);
    }

    return () => {};
  }, [dataList]);

  return (
    <>
      <h1>Pokemon Listing</h1>
      <HeaderComponent>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          color="secondary"
        >
          <Button onClick={handleSortByName}>Sort By Name</Button>
          <Button onClick={handleSortByHeight}>Sort By Height</Button>
          <Button onClick={handleSortByWeight}>Sort By Weight</Button>
        </ButtonGroup>
        <SearchBox
          placeholder="Search Pokemon By Name/Ability"
          searchText={search}
          handleChange={handleChange}
        />
      </HeaderComponent>
      <FlexWrapper>{PaginationComponent}</FlexWrapper>
      <Wrapper>
        {pokemonData &&
          (rowsPerPage > 0
            ? pokemonData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : pokemonData
          )
            .filter((pokemon) => {
              return (
                pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
                pokemon.abilities.some((ability) => {
                  return ability.ability.name
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
              );
            })
            .map((item, index) => {
              return <PokemonCard key={index} item={item}></PokemonCard>;
            })}
      </Wrapper>
      <FlexWrapper>{PaginationComponent}</FlexWrapper>
    </>
  );
};

export default PokemonDetails;
