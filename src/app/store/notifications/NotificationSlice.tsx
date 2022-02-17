import { createSlice } from '@reduxjs/toolkit';
interface IState {
    notificationData: any[];
    university_notificationData: any[];
};

const initialState:IState = {
    notificationData: [],
    university_notificationData: [],
};

export const NotificationSlice = createSlice({
    name:'notification',
    initialState,

    reducers: {
        setNotificationsData: (state, action) => {
            return {
                ...state,
                notificationData: action.payload,
            }

        },
        setUniNotificationsData: (state, action) => {
            return {
                ...state,
                university_notificationData: action.payload,
            }

        },

    }
});

// Action creators are generated for each case reducer function
export const {setNotificationsData,setUniNotificationsData} = NotificationSlice.actions;

export default NotificationSlice.reducer;