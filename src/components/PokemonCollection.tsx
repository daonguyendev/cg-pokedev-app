import React from "react";
import { PokemonDetail, ViewDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: ViewDetail;
  setViewDetail: React.Dispatch<React.SetStateAction<ViewDetail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setViewDetail } = props;
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setViewDetail({
        id: id,
        isOpened: true,
      });
    }
  };
  return (
    <>
      <section
        className={
          viewDetail.isOpened
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpened ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {pokemons.map((pokemon) => {
          return (
            <div onClick={() => selectPokemon(pokemon.id)}>
              <PokemonList
                viewDetail={viewDetail}
                setViewDetail={setViewDetail}
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                abilities={pokemon.abilities}
                image={pokemon.sprites.front_default}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};


export default PokemonCollection;
