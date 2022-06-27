import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice from '../Reducers/pokemon.slice';
import toastsSlice from '../Reducers/toasts.slice';
import { loadingListener } from './listeners';

const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer,
        toasts: toastsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(loadingListener.middleware)
});

export default store;