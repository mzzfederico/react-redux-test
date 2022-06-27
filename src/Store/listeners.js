import { createListenerMiddleware } from '@reduxjs/toolkit';
import { fetchPokemonByPage, pokemonReload } from '../Reducers/pokemon.slice';
import { addToast } from '../Reducers/toasts.slice';

export const loadingListener = createListenerMiddleware();

loadingListener.startListening({
    actionCreator: fetchPokemonByPage.pending,
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(addToast({ text: "Caricamento..." }));
    }
})

loadingListener.startListening({
    actionCreator: pokemonReload,
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(fetchPokemonByPage());
    }
})