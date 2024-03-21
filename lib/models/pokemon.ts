import { IPokemon } from "../interfaces/pokemon";
import { IPokemonsResponse } from "../interfaces/pokemons-response";
import { fetchJson } from "../utils/http";

const PAGESIZE = process.env.NEXT_PUBLIC_PAGESIZE || 0;
const API_PATH = process.env.NEXT_PUBLIC_POKEMON_API;

export function getPokemons(offset = 0, size = Number(PAGESIZE)) {
  const PATH = `${API_PATH}/pokemon?limit=${size}&offset=${offset}`;
  return fetchJson<IPokemonsResponse>(PATH, { next: { revalidate: 3600 } });
}

export function getPokemon(idOrName: string) {
  const PATH = `${API_PATH}/pokemon/${idOrName}`;
  return fetchJson<IPokemon>(PATH, { next: { revalidate: 3600 } });
}
