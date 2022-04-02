/* istanbul ignore file */
import React from "react";
import { getSessionStorage } from "../helper/sessionStorageHelper";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import {
  CardDetailWrapper,
  PokemonText,
  PokemonImage,
  PokemonItem,
  PokemonContent,
  PokemonName,
  FlexWrapper,
  AbilitiesList,
  AbilityName,
  Text,
} from "./style";

const PokemonCardDetail = () => {
  const selectedPokemon = getSessionStorage("selectedPokemon");
  const history = useHistory();

  const handlegoBack = () => {
    history.push("/");
  };

  return (
    <CardDetailWrapper>
      <PokemonName>
        <h1>{selectedPokemon.name}</h1>
      </PokemonName>
      <PokemonItem data-testid="resolved">
        <PokemonImage
          src={selectedPokemon.sprites.other["official-artwork"].front_default}
        />
        <PokemonContent>
          <FlexWrapper>
            <PokemonText>Height: {selectedPokemon.height}</PokemonText>
            <PokemonText>Weight: {selectedPokemon.weight}</PokemonText>
          </FlexWrapper>
          <AbilitiesList>
            <Text>Abilities:</Text>
            {selectedPokemon.abilities &&
              selectedPokemon.abilities.map((ability, index) => {
                return (
                  <AbilityName key={index}>{ability.ability.name}</AbilityName>
                );
              })}
          </AbilitiesList>
        </PokemonContent>
      </PokemonItem>
      <Button variant="contained" onClick={handlegoBack}>
        Back to Listing Page
      </Button>
    </CardDetailWrapper>
  );
};

export default PokemonCardDetail;
