import { createSlice } from '@reduxjs/toolkit';
interface IState {
    cart_items: any[];
};

const initialState:IState = {
    cart_items: [],
};

export const cartSlice = createSlice({
    name:'frontCart',
    initialState,

    reducers: {
        updateFrontCart: (state, action) => {
            return {
                ...state,
                cart_items: action.payload,
            }

        }
    }
});

// Action creators are generated for each case reducer function
export const { updateFrontCart} = cartSlice.actions;

export default cartSlice.reducer;