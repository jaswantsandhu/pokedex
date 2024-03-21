export interface IPokemonsResponse {
  count: number;
  next: string;
  previous: null;
  results: IPokemonResponse[];
}

export interface IPokemonResponse {
  name: string;
  url: string;
}
