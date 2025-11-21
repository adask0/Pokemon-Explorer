import { useState, useEffect } from "react";
import { getAllPokemon, getAllTypes } from "./services/api";
import PokemonItem from "./services/PokemonItem";
import pokeBall from "./assets/poke-ball.png";
import "./App.css";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokemonLimit, setPokemonLimit] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonResponse = await getAllPokemon();
        console.log("All Pokemon:", pokemonResponse.data);
        setAllPokemons(pokemonResponse.data.results);
        setPokemons(pokemonResponse.data.results);

        const typesResponse = await getAllTypes();
        console.log("All Types:", typesResponse.data);
        setTypes(typesResponse.data.results);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const searchPokemon = (event) => {
    const query = event.target.value.toLowerCase();

    if (query === "") {
      setPokemons(allPokemons);
    } else {
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
      );
      setPokemons(filteredPokemons);
    }
  };

  const loadMorePokemons = () => {
    setPokemonLimit((prevLimit) => prevLimit + 6);
  };

  const loadLessPokemons = () => {
    setPokemonLimit((prevLimit) => Math.max(prevLimit - 6, 6));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <img
          src={pokeBall}
          alt="Poke Ball"
          style={{
            width: "50px",
            height: "50px",
            margin: "auto 1rem auto auto",
          }}
        />
        <h1
          style={{
            background: "linear-gradient(to right, orange, yellow)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "2.3rem",
            textAlign: "center",
            margin: "0 auto auto 0",
          }}
        >
          Pokemon Explorer
        </h1>
      </div>
      <input
        type="search"
        onChange={searchPokemon}
        placeholder="Search Pokemon..."
      />
      <div className="pokemon-grid">
        {pokemons.slice(0, pokemonLimit).map((pokemon) => (
          <PokemonItem key={pokemon.name} limit={pokemonLimit} />
        ))}
      </div>
      {pokemonLimit > 6 && (
        <button onClick={loadLessPokemons}>Load Less</button>
      )}
      <button onClick={loadMorePokemons}>Load More</button>
    </div>
  );
}

export default App;
