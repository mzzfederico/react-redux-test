import { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attackPokemon, loadPokemon } from '../reducers/battle.slice';

const randomPokemonNumber = () => Math.floor(Math.random() * 101);

export default function Home() {
    const dispatch = useDispatch();

    const allPokemons = useSelector(
        state => state.battle.pokemons
    );

    useEffect(() => {
        if (allPokemons.length < 2) {
            dispatch(loadPokemon({ id: randomPokemonNumber() }));
        }
    }, [allPokemons.length, dispatch]);

    return (
        <div className="battle">
            {allPokemons
                .filter(pokemon => !pokemon.isLoading && pokemon.data)
                .map(pokemon => (
                    /*
                        TODO: mostrare il pokemon di turno di spalle, e viceversa
                    */
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

    /*
        TODO: stilizzare il profilo del pokemon
        TODO: barra degli HP, un div dentro l'altro, con le classi del colore degli HP, in base a quanti ne restano
        TODO: aggiungere HP iniziali oltre a quelli correnti
        es. -25% rosso -75% giallo 75-100% verde
        nb. barra degli HP è un componente indipendente (bonus: memoizzatelo) (bonus 2: animazione CSS)
        https://www.akibagamers.it/wp-content/uploads/2016/03/pokemon-versione-rossa-blu-gialla-recensione-screenshot-17.jpg
    */

    return (
        <div className="pokemon">
            <h2>{name}</h2>
            <h3>HP: {hp}</h3>
            <img src={sprite} alt={name} />
            <div className="moves">
                {/*
                    TODO: prendete mosse random
                */}
                {moves.slice(0, 4).map(move => (
                    <button key={move.name} onClick={() => onAttack(move.name)}>{move.name}</button>
                ))}
            </div>
        </div>
    )
}