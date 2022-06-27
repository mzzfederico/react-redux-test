import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchPokemonByPage, pokemonReload } from "../Reducers/pokemon.slice";

export default function Home() {
    const dispatch = useDispatch();
    const params = useParams();

    const arePokemonLoading = useSelector(state => state.pokemon.isLoading);
    const pokemonData = useSelector(state => state.pokemon.data);

    useEffect(() => {
        dispatch(fetchPokemonByPage(params.page));
    }, [dispatch, params.page]);

    return (
        <div className="pokemons">
            {arePokemonLoading && <h1>Caricamento...</h1>}
            {!arePokemonLoading && JSON.stringify(pokemonData, null, 4)}
            <button onClick={() => dispatch(pokemonReload)}>ricarica</button>
        </div>
    )
}

/* Esempio con reducer */
/* export function HomeReducer() {
    const dispatch = useDispatch();
    const pokemonsData = useSelector(state => state.pokemon.data);

    useEffect(() => {
        (async function () {
            dispatch(loadPokemons());
            fetch(`https://pokeapi.co/api/v2/pokemon`)
                .then(response => response.json())
                .then(json => dispatch(
                    loadPokemonsSuccess({ pokemons: json.results })
                ))
                .catch(error => dispatch(
                    loadPokemonsFailure()
                ))
        })();
    }, [dispatch]);

    return null;
} */