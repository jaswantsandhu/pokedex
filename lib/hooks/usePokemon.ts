import { useEffect, useState } from "react";
import { IPokemon } from "../interfaces/pokemon";
import { getPokemon } from "../models/pokemon";

const pokemonDetailsCache: { [key: string]: any } = {};

const usePokemonDetails = (pokemonIdOrName: string) => {
  const [pokemonDetails, setPokemonDetails] = useState<IPokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (pokemonDetailsCache[pokemonIdOrName]) {
        setPokemonDetails(pokemonDetailsCache[pokemonIdOrName]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await getPokemon(pokemonIdOrName);
        pokemonDetailsCache[pokemonIdOrName] = response;
        setPokemonDetails(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (pokemonIdOrName) {
      fetchPokemonDetails();
    }
  }, [pokemonIdOrName]);

  return { pokemonDetails, error, loading };
};

export default usePokemonDetails;
