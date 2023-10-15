export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface ViewDetail { 
  id: number;
  isOpened: boolean;
}

export interface PokemonDetail extends Pokemon {
  id: number;
  isOpened: boolean;
  abilities?: {
    ability: string;
    name: string;
  }[];
}
