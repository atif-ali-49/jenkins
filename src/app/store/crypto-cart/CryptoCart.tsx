import { createSlice } from '@reduxjs/toolkit';
interface IState {
    cart_items: any[];
};

const initialState:IState = {
    cart_items: [],
};

export const cartSlice = createSlice({
    name:'cryptoCart',
    initialState,

    reducers: {
        cryptoCart: (state, action) => {
            return {
                ...state,
                cart_items: action.payload,
            }

        }
    }
});

// Action creators are generated for each case reducer function
export const { cryptoCart} = cartSlice.actions;

export default cartSlice.reducer;