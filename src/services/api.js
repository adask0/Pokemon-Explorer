import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export const getAllPokemon = (limit, offset) => {
  return api.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
};

export const getPokemon = (nameOrId) => {
  return api.get(`/pokemon/${nameOrId}`);
};

export const getAllTypes = () => {
  return api.get("/type");
};

export const getPokemonDetails = async (limit, offset) => {
  try {
    const listResponse = await getAllPokemon(limit, offset);
    const pokemonList = listResponse.data.results;

    const detailedPokemon = await Promise.all(
      pokemonList.map((pokemon) => axios.get(pokemon.url))
    );

    return detailedPokemon.map((response) => {
      const data = response.data;
      console.log(data)
      return {
        id: data.id,
        name: data.name,
        sprite:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
        types: data.types.map((typeInfo) => ({
          name: typeInfo.type.name,
          color: typeColors[typeInfo.type.name],
        })),
      };
    });
  } catch (error) {
    throw error;
  }
};

export default api;
