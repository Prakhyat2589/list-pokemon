/* istanbul ignore file */
import React from "react";
import { Link } from "react-router-dom";
import { setSessionStorage } from "../helper/sessionStorageHelper";
import {
  ItemsWrapper,
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

const PokemonCard = (props) => {
  const { item } = props;

  const handleClick = (item) => {
    setSessionStorage("selectedPokemon", item);
  };

  return (
    <ItemsWrapper onClick={() => handleClick(item)}>
      <PokemonItem data-testid="resolved">
        <Link to={`/pokemon/${item.name}`}>
          <PokemonImage
            src={item.sprites.other["official-artwork"].front_default}
          />
        </Link>
        <PokemonContent>
          <PokemonName>
            <h3>{item.name}</h3>
          </PokemonName>
          <FlexWrapper>
            <PokemonText>Height: {item.height}</PokemonText>
            <PokemonText>Weight: {item.weight}</PokemonText>
          </FlexWrapper>
          <AbilitiesList>
            <Text>Abilities:</Text>
            {item.abilities &&
              item.abilities.map((ability, index) => {
                return (
                  <AbilityName key={index}>{ability.ability.name}</AbilityName>
                );
              })}
          </AbilitiesList>
        </PokemonContent>
      </PokemonItem>
    </ItemsWrapper>
  );
};

export default PokemonCard;
