/*

    1. Carichiamo due pokemon random:
        1. Chiamare l'azione che carica un pokemon => loadPokemon.pending => setta isLoading a true
        2. Successo/fallimento dell'operazione => loadPokemon.fulfill/rejected => setta isLoading a false
        3. Salvare il pokemon fra i pokemon

    2. Quando abbiamo i due pokemon, possiamo dispatchare un attacco con name e url
        1. Chiamiamo il thunk attack con il nostro url per trovare le informazioni sulla mossa
        2. Passiamo l'id del pokemon da attaccare
        3. Successo/fallimento dell'operazione => attackPokemon.fulfill/rejected => scende vita del pokemon con quel id
*/

import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";

const createPokemonData = ({ hp, moves, sprite, name }) => ({
    hp: hp * 10, moves: moves.map(item=>item.move), sprite, name
});

const pokemonInitialState = {
    isLoading: false,
    isError: false,
    data: null
}

const initialState = {
    pokemons: []
}

export default createSlice({
    name: "battle",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPokemon.pending, (state, action) => {
                state.pokemons = [
                    ...state.pokemons,
                    { ...pokemonInitialState, isLoading: true, id: action.meta.arg.id }
                ];
            })
            .addCase(loadPokemon.fulfilled, (state, action) => {
                state.pokemons = state.pokemons.map(pokemonState => {
                    if (pokemonState.id === action.meta.arg.id) {
                        pokemonState.data = createPokemonData({
                            ...action.payload,
                            sprite: action.payload.sprites['front_default'],
                            hp: action.payload.stats[0].base_stat
                        });
                        pokemonState.isLoading = false;
                    }
                    return pokemonState;
                })
            })
            .addCase(loadPokemon.rejected, (state, action) => {
                state.pokemons = state.pokemons.map(pokemonState => {
                    if (pokemonState.id === action.meta.arg.id) {
                        pokemonState.isError = true;
                        pokemonState.isLoading = false;
                    }
                    return pokemonState;
                })
            })
            .addCase(attackPokemon.fulfilled, (state, action) => {
                state.pokemons = state.pokemons.map(pokemonState => {
                    if (pokemonState.id === action.meta.arg.id && action.payload.power) {
                        pokemonState.data.hp = (pokemonState.data.hp - action.payload.power);
                    }
                    return pokemonState;
                });
                state.pokemons = state.pokemons.filter(pokemon => pokemon.data.hp > 0);
            })
    }
});

export const loadPokemon = createAsyncThunk("loadPokemon", async function ({id}) { /* arguments => meta.arg */
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json()) /* fulfilled response.json => payload */
        .catch(error => error); /* rejected */
})

export const attackPokemon = createAsyncThunk("attackPokemon", async function ({ name }) {
    return fetch(`https://pokeapi.co/api/v2/move/${name}`)
        .then(response => response.json()) /* fulfilled response.json => payload */
        .catch(error => error); /* rejected */
})