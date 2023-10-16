import { useEffect, useState } from "react";
import useScorm from "./hooks/useScorm";

async function fetchPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");

    const data = await response.json();
    return data.results;
}

function App() {
    const { scorm } = useScorm();

    useEffect(() => {
        (async function () {
            await scorm.init();
        })();
    }, [scorm]);

    // Estados do fetch example

    const [pokemon, setPokemon] = useState([]);
    const [pokemonShown, setPokemonShown] = useState(null);

    // Forma mais fácil de chamar só 1 vez a api
    if (pokemon.length === 0) {
        fetchPokemon().then((results) => {
            console.log("Requisição realizada.");
            console.log(results);
            setPokemon(results);
        });
    }

    // Forma menos prática de fazer chamada a api
    // useEffect(() => {
    //     fetchPokemon().then((results) => {
    //         console.log("Requisição realizada.");
    //         console.log(results);
    //         setPokemon(results);
    //     });
    // }, []);

    const showDetails = async (url) => {
        const data = await fetch(url).then((res) => res.json());
        console.log("Pokémon encontrado");
        console.log(data);
        setPokemonShown(data);
    };

    return (
        <div className="app">
            <div>
                <h2>Pokémon</h2>
                <ul className="pokemon">
                    {pokemon.map((mon) => (
                        <li key={mon.name}>
                            <span>{mon.name}</span>
                            <button onClick={() => showDetails(mon.url)}>
                                Ver detalhes
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {pokemonShown && (
                <div>
                    <h2>{pokemonShown.name}</h2>
                    <img src={pokemonShown.sprites.front_default} alt="" />
                    <div className="stat">
                        <b>Tipo: </b>
                        {pokemonShown.types.map(({ type }) => (
                            <span key={type.name}>{type.name} </span>
                        ))}
                    </div>
                    <div className="stat">
                        <b>Altura: </b>
                        {pokemonShown.height / 10} m
                    </div>
                    <div className="stat">
                        <b>Peso: </b>
                        {pokemonShown.weight / 10} Kg
                    </div>
                    <div className="stat">
                        <b>Atributos</b>
                        <ul>
                            {pokemonShown.stats.map(({ base_stat, stat }) => (
                                <li key={stat.name}>
                                    {stat.name}: {base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="stat">
                        <b>Habilidades</b>
                        <ul>
                            {pokemonShown.abilities.map(
                                ({ ability, is_hidden }) => (
                                    <li key={ability.name}>
                                        {ability.name}
                                        {is_hidden && " (secreta)"}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
