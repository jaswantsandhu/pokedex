import { useCallback, useState } from "react";
import { IPokemonsResponse } from "../interfaces/pokemons-response";
import { getPokemons } from "../models/pokemon";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<IPokemonsResponse["results"]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPokemons = useCallback(async (offset = 0, size = 10) => {
    setLoading(true);
    try {
      const response = await getPokemons(offset, size);
      setPokemons(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return { pokemons, error, loading, fetchPokemons };
};

export default usePokemons;
