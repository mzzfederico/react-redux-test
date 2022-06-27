import { createAction, createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";

/* Azioni */
export const loadPokemons = createAction('loading');
export const loadPokemonsSuccess = createAction('success');
export const loadPokemonsFailure = createAction('failure');

/* Reducer */
const pokemonReducer = createReducer(
    { data: [], isLoading: false, isError: false, page: 0 },
    (builder) => {
        builder
            .addCase(loadPokemons, (draft, action) => {
                draft.isLoading = true;
            })
            .addCase(loadPokemonsSuccess, (draft, action) => {
                draft.data = action.payload.pokemons;
                draft.isLoading = false;
            })
            .addCase(loadPokemonsFailure, (draft, action) => {
                draft.isError = true;
                draft.isLoading = false;
            })
    }
);

export default pokemonReducer;