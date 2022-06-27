import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: { error: null, data: [], isLoading: false, isError: false, page: 0 },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonByPage.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchPokemonByPage.fulfilled, (state, action) => {
            state.error = null;
            state.data = action.payload;
            state.isLoading = false;
        }).addCase(fetchPokemonByPage.rejected, (state, action) => {
            state.data = {};
            state.error = action.payload;
            state.isLoading = false;
        })
    }
});

export const pokemonReload = createAction('pokemons/reload');

/* Thunks */
export const fetchPokemonByPage = createAsyncThunk('pokemons/fetchPokemonByPage', async function (page) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}`);
        const json = await response.json();
        return json.results;
    } catch (error) {
        throw error;
    }
});

export default pokemonSlice;