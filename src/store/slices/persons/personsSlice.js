import { createSlice } from '@reduxjs/toolkit';

export const personsSlice = createSlice({
    name: 'persons',
    initialState: {
        persons: [],
        isLoading: true,
    },
    reducers: {
        onAddNewPerson: (state, { payload }) => {
            state.persons.push(payload);
        },
        onLoadingPersons: (state, { payload }) => {
            state.persons = payload;
            state.isLoading = false;
        },
        onUpdatePerson: (state, { payload }) => {
            state.persons = state.persons.map(person => {
                if (person.uid === payload.uid) {
                    return payload;
                }
                return person;
            });
        },
        onDeletePerson: (state, { payload }) => {
            state.persons = state.persons.filter(person => person.id !== payload.id);
        },
        onLogoutPersons: ( state ) => {
            state.isLoading = true;
            state.persons = [];
        }
    }
});

// Action creators are generated for each case reducer function
export const { 
    onAddNewPerson,
    onDeletePerson,
    onLoadingPersons,
    onLogoutPersons, 
    onUpdatePerson,
} = personsSlice.actions;