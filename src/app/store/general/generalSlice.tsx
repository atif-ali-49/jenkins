import { createSlice } from '@reduxjs/toolkit';

interface IState {
    theme: string;
}
const initialState:IState = {
    theme: 'light',
};

export const generalSlice = createSlice({
    name:'general',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            return {
                ...state,
                theme: action.payload,
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { setTheme} = generalSlice.actions;

export default generalSlice.reducer;