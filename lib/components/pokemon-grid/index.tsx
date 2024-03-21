import { getPokemons } from "@/lib/models/pokemon";
import Grid from "@/lib/components/pokemon-grid/grid";

export default async function PokemonGrid() {
  const PAGESIZE = process.env.NEXT_PUBLIC_PAGESIZE
  const { results, count } = await getPokemons();
  return <Grid pokemons={results} total={count} pagesize={Number(PAGESIZE)} />;
}
