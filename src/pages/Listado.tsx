import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Figure from "react-bootstrap/Figure";

import { PokemoController } from "../controllers/PokemonController";
import { Pokemon } from "../models/Pokemon.m";

const Listado = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");

  useEffect(() => {
    const obtenerTodos = async () => {
      const allPokemons = await PokemoController();
      setPokemons(allPokemons);
    };
    obtenerTodos();
  });

  const filtrarPokemon=pokemons?.slice(0,400).filter((pokemon)=>{
    const nameMatchesQuery = pokemon.name.toLowerCase().includes(query.toLowerCase());
    const typeMatchesQuery = typeQuery === "" || pokemon.type.toLowerCase() === typeQuery.toLowerCase();
    return nameMatchesQuery && typeMatchesQuery;
})

const tiposUnicos = [...new Set(pokemons?.map((pokemon) => pokemon.type.toLowerCase()))];

  return (
    <>
      <h1 className="text-center">Pokedex</h1>
      <header>
        <input value={query} placeholder="Buscar Pokemon" onChange={(event) => setQuery(event.target.value.trim())} type="text"></input>
        <select value={typeQuery} onChange={(event) => setTypeQuery(event.target.value.toLowerCase())} style={{margin: "5px"}}>
          <option value="">Todos los tipos</option>
          {tiposUnicos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </header>
      <br></br>
      <div className="content-wrapper">
        <div className="content">
          <div className="row gap-3" style={{margin: "7px"}}>
            {filtrarPokemon?.slice(0, 400).map((pokemon) => (
              <Card className="mx-auto" style={{ width: "18rem", border: "1.5px solid #000000"}}>
                <Card.Header className="text-center" style={{borderBottom: "1.5px solid #000000"}}>
                  <b>Tipo:</b> {pokemon.type}
                </Card.Header>
                <Card.Img
                  variant="top"
                  width="100"
                  height="100"
                  className="d-block mx-auto w-50"
                  src={pokemon.imggif}
                />
                <Card.Body>
                  <Card.Title className="text-center">
                    {pokemon.id} - {pokemon.name}
                  </Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      {" "}
                      <Figure.Image
                        width={16}
                        height={16}
                        src="https://cdn-icons-png.flaticon.com/128/833/833472.png"
                      />
                      <b> HP:</b> {pokemon.hp}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <Figure.Image
                        width={16}
                        height={16}
                        alt="10x10"
                        src="https://cdn-icons-png.flaticon.com/512/3522/3522092.png"
                      />{" "}
                      <b> Ataque:</b> {pokemon.attack}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <Figure.Image
                        width={16}
                        height={16}
                        alt="10x10"
                        src="https://cdn-icons-png.flaticon.com/512/929/929429.png"
                      />{" "}
                      <b> Defensa:</b> {pokemon.defense}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <Figure.Image
                        width={16}
                        height={16}
                        alt="10x10"
                        src="https://cdn-icons-png.flaticon.com/512/1671/1671062.png"
                      />
                      <b> Ataque especial:</b> {pokemon.sp_atk}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <Figure.Image
                        width={16}
                        height={16}
                        alt="10x10"
                        src="https://cdn-icons-png.flaticon.com/512/1671/1671062.png"
                      />
                      <b> Defensa espaecial:</b> {pokemon.sp_def}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <Figure.Image
                        width={16}
                        height={16}
                        alt="10x10"
                        src="https://cdn-icons-png.flaticon.com/512/8853/8853763.png"
                      />
                      <b> Velocidad:</b> {pokemon.speed}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Listado;
