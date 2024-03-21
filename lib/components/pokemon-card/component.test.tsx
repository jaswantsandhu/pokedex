/* eslint-disable @next/next/no-img-element */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import usePokemonDetails from "../../../lib/hooks/usePokemon";
import PokemonCard from "./index";

jest.mock("../../../lib/hooks/usePokemon", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

test("displays loading state correctly", () => {
  usePokemonDetails.mockReturnValue({
    loading: true,
    error: null,
    pokemonDetails: null,
  });
  const pokemon = { name: "pikachu", url: "" };
  render(<PokemonCard pokemon={pokemon} />);
  expect(screen.getByText(/loading pikachu\.\.\./i)).toBeInTheDocument();
});

test("displays error state correctly", () => {
  usePokemonDetails.mockReturnValue({
    loading: false,
    error: true,
    pokemonDetails: null,
  });
  const pokemon = { name: "pikachu", url: "" };
  render(<PokemonCard pokemon={pokemon} />);
  expect(
    screen.getByText(/error loading details for pikachu\./i)
  ).toBeInTheDocument();
});
test("displays pokemon details correctly", async () => {
  const mockPokemonDetails = {
    name: "Pikachu",
    sprites: { front_default: "pikachu-image-url" },
    types: [{ type: { name: "electric" } }],
    weight: 60,
    height: 4,
    id: 25,
  };
  usePokemonDetails.mockReturnValue({
    loading: false,
    error: null,
    pokemonDetails: mockPokemonDetails,
  });
  const pokemon = { name: "pikachu", url: "" };

  render(<PokemonCard pokemon={pokemon} />);

  expect(screen.getByText("Pikachu")).toBeInTheDocument();
  expect(screen.getByAltText("Photo of Pikachu")).toHaveAttribute(
    "src",
    "pikachu-image-url"
  );



  expect(screen.getByText(/60/i)).toBeInTheDocument();
  expect(screen.getByText(/4/i)).toBeInTheDocument();
});
