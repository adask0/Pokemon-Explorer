import { useState, useEffect } from "react";
import { getPokemonDetails } from "./api";

export default function PokemonItem({ limit }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getPokemonDetails(limit);
        setPokemonDetails(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemon details:", error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [limit]);

  const pokemonId = (id) => {
    return id.toString().padStart(3, "0");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {pokemonDetails.map((pokemon) => (
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
  );
}
