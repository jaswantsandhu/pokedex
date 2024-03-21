"use client";

import { useCallback, useEffect, useState } from "react";
import PokemonCard from "../pokemon-card";
import { IPokemonResponse } from "@/lib/interfaces/pokemons-response";
import usePokemons from "@/lib/hooks/usePokemons";
import Search from "@/lib/components/search";

interface PokemonGridProps {
  pokemons: IPokemonResponse[];
  total: number;
  pagesize?: number;
}

const Grid = ({
  pokemons: defaultPokemons,
  total,
  pagesize = 20,
}: PokemonGridProps) => {
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] =
    useState<IPokemonResponse[]>(defaultPokemons);
  const { fetchPokemons, loading, pokemons, error } = usePokemons();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (offset >= defaultPokemons.length) {
      fetchPokemons(offset, pagesize);
    }
  }, [offset, pagesize, fetchPokemons, defaultPokemons.length]);

  useEffect(() => {
    if (pokemons.length) {
      setAllPokemons((prevPokemons) => [...prevPokemons, ...pokemons]);
    }
  }, [pokemons]);

  const loadMore = useCallback(() => {
    setOffset((prevOffset) => prevOffset + pagesize);
  }, [pagesize]);

  return (
    <>
      <Search onSearchChange={setSearchTerm} />
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </section>
      {total > allPokemons.length && searchTerm === "" && (
        <div
          className="border p-4 m-4 text-center cursor-pointer bg-gray-500 text-white"
          onClick={loadMore}
        >
          {loading ? "Loading..." : "Loadmore"}
        </div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
    </>
  );
};

export default Grid;
