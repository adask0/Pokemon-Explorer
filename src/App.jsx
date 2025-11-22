import { useState, useEffect } from "react";
import { getAllPokemon, getAllTypes, getPokemonDetails } from "./services/api";
import PokemonItem from "./services/PokemonItem";
import pokeBall from "./assets/poke-ball.png";
import "./App.css";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonResponse = await getAllPokemon(limit);
        setAllPokemons(pokemonResponse.data.results);
        setPokemons(pokemonResponse.data.results);
        const details = await getPokemonDetails(limit);
        setPokemonDetails(details);
        setLoading(false);

        const typesResponse = await getAllTypes();
        setTypes(typesResponse.data.results);

        setLoading(false);
      } catch (error) {
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

  const pokemonId = (id) => {
    return id.toString().padStart(3, "0");
  };

  const loadMorePokemons = () => {
    setLimit((prevLimit) => prevLimit + 6);
  };

  const loadLessPokemons = () => {
    setLimit((prevLimit) => Math.max(prevLimit - 6, 6));
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
            margin: "auto auto auto 0",
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
        {pokemonDetails.slice(0, limit).map((pokemon) => (
          <div
            key={pokemon.id}
            style={{ backgroundColor: pokemon.types[0].color }}
          >
            <img src={pokemon.sprite} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p style={{ fontWeight: "500" }}>#{pokemonId(pokemon.id)}</p>
            <div>
              {pokemon.types.map((type) => (
                <span
                  key={type.name}
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    padding: "0.7rem 1.2rem",
                    borderRadius: "25px",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    margin: "0 1rem",
                  }}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {limit > 6 && <button onClick={loadLessPokemons}>Load Less</button>}
      <button onClick={loadMorePokemons}>Load More</button>
    </div>
  );
}

export default App;
