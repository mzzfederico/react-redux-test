import { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attackPokemon, loadPokemon } from '../reducers/battle.slice';

const randomPokemonNumber = () => Math.floor(Math.random() * 101);

export default function Home() {
    const [currentIDs, setCurrentIDs] = useState([]);
    const dispatch = useDispatch();

    const allPokemons = useSelector(
        state => state.battle.pokemons
    );

    useEffect(() => {
        if (allPokemons.length <= 1) {
            dispatch( loadPokemon({ id: randomPokemonNumber() }) )
        }
    }, [allPokemons.length, dispatch]);

    return (
        <div className="battle">
            {allPokemons
                .filter(pokemon => !pokemon.isLoading && pokemon.data)
                .map(pokemon => (
                    <PokemonProfile
                        key={pokemon.id}
                        id={pokemon.id}
                        {...pokemon.data}
                    />
                ))}
        </div>
    );
}

function PokemonProfile({ hp, moves, sprite, name, id }) {
    const dispatch = useDispatch();
    const targetPokemon = useSelector(
        state => state.battle.pokemons.find(
            pokemon => pokemon.id !== id
        )
    );

    const onAttack = (name) => dispatch(attackPokemon({ id: targetPokemon.id, name }));

    return (
        <div className="pokemon">
            <h2>{name}</h2>
            <h3>HP: {hp}</h3>
            <img src={sprite} alt={name} />
            <div className="moves">
                {moves.slice(0, 4).map(move => (
                    <button key={move.name} onClick={() => onAttack(move.name)}>{move.name}</button>
                ))}
            </div>
        </div>
    )
}