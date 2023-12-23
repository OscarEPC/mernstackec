import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/auth/authSlice';
import { personsSlice } from './slices/persons/personsSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        persons: personsSlice.reducer,
    },
})