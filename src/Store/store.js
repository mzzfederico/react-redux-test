import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './listeners';
import battleSlice from '../reducers/battle.slice';

const store = configureStore({
    reducer: {
        battle: battleSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

export default store;