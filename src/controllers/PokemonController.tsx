import { Pokemon } from "../models/Pokemon.m";

export async function PokemoController(): Promise<Pokemon[]> {

    //llamado a la api rest
    const response = await fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json");

    const datos = await response.json();

    const pokemons = datos.results.map((pokemon:any) => ({
        id : pokemon.national_number,
        name : pokemon.name,
        imggif : CorregirDireccion(pokemon.sprites['animated']),
        imglarge : CorregirDireccion(pokemon.sprites['large']),
        imgnormal : CorregirDireccion(pokemon.sprites['normal']),
        total : pokemon.total,
        hp : pokemon.hp,
        attack : pokemon.attack,
        defense : pokemon.defense,
        sp_atk: pokemon.sp_atk,
        sp_def: pokemon.sp_atk,
        speed: pokemon.speed,
        type : pokemon.type[0]
    }));

    const pokemonsUnicos = pokemons.filter((pokemon:any, index:number) => 
        pokemons.findIndex((other:any) => other.id === pokemon.id) === index
    );

    return pokemonsUnicos
}

export function CorregirDireccion(name: string): string {
    const correcciones: { [key: string]: string } = {
      "farfetch'd": "farfetchd",
      "mr.-mime": "mr-mime",
      "♂": "-m",
      "♀": "-f"
    };
  
    for (const key in correcciones) {
      if (name.includes(key)) {
        return name.replace(key, correcciones[key]);
      }
    }
  
    return name;
  }
  