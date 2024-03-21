"use client";
import usePokemonDetails from "@/lib/hooks/usePokemon";
import { IPokemonResponse } from "@/lib/interfaces/pokemons-response";
import Card from "@/lib/components/card";
import Image from "next/image";
import React from "react";
import PokemonBadge from "@/lib/components/badge";

interface PokemonCardProps {
  pokemon: IPokemonResponse;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { pokemonDetails, loading, error } = usePokemonDetails(pokemon.name);

  if (loading)
    return (
      <Card>
        <div className="text-center">
          <div className="spinner mx-auto" aria-live="polite"></div>
          Loading {pokemon.name}...
        </div>
      </Card>
    );

  if (error) return <Card>Error loading details for {pokemon.name}.</Card>;

  return (
    <Card>
      {pokemonDetails && (
        <>
          <div className="text-center mb-4 flex flex-col items-center">
            <h2 className="text-xl font-bold">{pokemonDetails.name}</h2>
            <div className="border rounded bg-slate-200 w-full items-center justify-center flex mt-4 relative">
              <Image
                className="block"
                width={200}
                height={200}
                src={pokemonDetails.sprites.front_default || ""}
                alt={`Photo of ${pokemonDetails.name}`}
                unoptimized={true}
              />
              <PokemonBadge
                id={pokemonDetails.id}
                type={pokemonDetails.types[0].type.name as any}
              />
            </div>
          </div>
          <ul className="pl-1">
            <li>
              <strong>Types:</strong>{" "}
              {pokemonDetails.types
                .map((typeInfo) => typeInfo.type.name)
                .join(", ")}
            </li>
            <li>
              <strong>Weight:</strong> {pokemonDetails.weight}
            </li>
            <li>
              <strong>Height:</strong> {pokemonDetails.height}
            </li>
          </ul>
        </>
      )}
    </Card>
  );
};

export default React.memo(PokemonCard);
