import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { PokemonDetail, ViewDetail } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<ViewDetail>({
    id: 0,
    isOpened: false,
  });
  useEffect(() => {
    const getPokemon = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=12&offset=20"
      );
      console.log(response.data);
      setNextUrl(response.data.next);
      response.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        console.log(poke.data);
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      });
    };
    getPokemon();
  }, []);

  const nextPage = async () => {
    setLoading(true);
    let response = await axios.get(nextUrl);
    setNextUrl(response.data.next);
    response.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
    });
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        {!viewDetail.isOpened ? (
          <div className="btn">
            <button onClick={nextPage}>
              {" "}
              {loading ? "Loading..." : "Load more"}{" "}
            </button>
          </div>
        ) : ""}
      </div>
    </div>
  );
};

export default App;
