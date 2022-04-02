import styled from "styled-components";

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

const ItemsWrapper = styled.li`
  display: flex;
  padding: 1rem;
  max-width: 250px;
  width: 100%;
  @media (min-width: 40rem) {
    width: 50%;
  }
  @media (min-width: 56rem) {
    width: 33.3333%;
  }
`;

const PokemonItem = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  :hover {
    .card__image {
      filter: contrast(100%);
    }
  }
`;

const PokemonName = styled.div`
  font-size: 1.25rem;
  text-transform: capitalize;
`;

const PokemonText = styled.div`
  flex: 1 1 auto;
  line-height: 1.5;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  filter: contrast(70%);
  overflow: hidden;
  position: relative;
  transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
  ::before {
    content: "";
    display: block;
    padding-top: 56.25%;
  }
  @media (min-width: 40rem) {
    ::before {
      padding-top: 66.6%;
    }
  }
  :hover {
    filter: contrast(100%);
  }
`;

const PokemonContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
`;
const AbilitiesList = styled(Wrapper)`
  flex-direction: column;
  width: auto;
  margin: 0 auto;
  list-style: disc;
  align-items: flex-start;
`;

const AbilityName = styled.li`
  text-transform: capitalize;
`;

const Text = styled(PokemonText)`
  font-size: 18px;
  font-weight: 600;
}
`;

const HeaderComponent = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  justify-content: space-evenly;
  width: 100%;
  margin: 0 auto;
  gap: 12px;
`;

const CardDetailWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  max-width: 750px;
  width: 100%;
  margin: 0 auto;
  gap: 60px;
`;

export {
  Wrapper,
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
  HeaderComponent,
  CardDetailWrapper,
};
