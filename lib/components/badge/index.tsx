import React from "react";

const typeColorMap = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-700",
  ground: "bg-yellow-700",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-800",
  ghost: "bg-purple-900",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

interface PokemonTypeBadgeProps {
  type: keyof typeof typeColorMap;
  id: number | string;
}

const PokemonBadge: React.FC<PokemonTypeBadgeProps> = ({ type, id }) => {
  const bgColorClass = typeColorMap[type] || "bg-gray-200";

  return (
    <span className={`absolute rounded top-2 right-2 ${bgColorClass} w-20 text-white`}>
      #{id}
    </span>
  );
};

export default PokemonBadge;
