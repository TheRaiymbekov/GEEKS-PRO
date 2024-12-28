import React, {useEffect, useState} from "react";
import './PokemonPage.css'

const PokemonPage = () => {
    const [pokemonCard, setPokemonCard] = useState([]);

    useEffect(() => {

        const fetchPokemon = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6");
            const data = await response.json();


            const pokemonData = await Promise.all(
                data.results.map(async (pokemon) => {
                    const pokemons = await fetch(pokemon.url);
                    return await pokemons.json();
                })
            );
            setPokemonCard(pokemonData);
        };

        fetchPokemon();
    }, []);

    return (
        <div className="card-container">
            {pokemonCard.map((pokemon) => (
                <div className="card" key={pokemon.id}>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="pokemon-image"
                    />
                    <h3>{pokemon.name}</h3>
                </div>
            ))}
        </div>
    )}
export default PokemonPage;