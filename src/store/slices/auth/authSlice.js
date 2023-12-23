import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        person: {},
        errorMessage: undefined
    },
    reducers: {
        checking: (state, /* action */ ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'no-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

// Action creators are generated for each case reducer function
export const { 
    checking, 
    clearErrorMessage, 
    onLogin, 
    onLogout, 
} = authSlice.actions;