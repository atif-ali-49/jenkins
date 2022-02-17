import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IState {
    showAlertMessage: boolean,
    comingSoonModal: boolean,
    message: string,
    messageType: string
}

const initialState:IState = {
    showAlertMessage: false,
    message: '',
    messageType: 'error',
    comingSoonModal: false
};

export const alertSlice = createSlice({
    name: 'systemAlerts',
    initialState,

    reducers: {
        showAlert: (state, action) => {
            return {
                ...state,
                showAlertMessage: action.payload.showAlertMessage,
                message: action.payload.message,
                messageType: action.payload.messageType
            }
        },

        showComingSoonModal: (state, action) => {
            return {
                ...state,
                comingSoonModal: action.payload,
                showAlertMessage: false,
            }
        },

    },
});

// Action creators are generated for each case reducer function
export const { showAlert, showComingSoonModal} = alertSlice.actions;
export default alertSlice.reducer;