import { createSlice } from '@reduxjs/toolkit';

interface IState{
    token: string;
    isLoggedIn: boolean;
    referral:string;
    currentUser: {
        id: number;
        username: string;
        referrer_id:string;
        first_name: string;
        last_name: string;
        profilePicture: string;
        defaultRole: '';
        defaultPermission: '';
        defaultPackage: '';
        email:string;
        street_address:string;
        city:string;
        state:string;
        country:string;
        post_code:string;
        mobile:string;
        e_balance: string;
        ibo_status: number;
        pc_balance: number;
        paid_status:number;
        area_coordinator:number;
        path:string;
        commission_balance:number;
    },
    languages:any[]
}

const initialState:IState = {
    isLoggedIn: false,
    token: '',
    referral:'',
    currentUser: {
        id: 0,
        profilePicture: '',
        defaultRole: '',
        defaultPermission: '',
        defaultPackage: '',
        referrer_id:'',
        first_name:'',
        last_name:'',
        username:'',
        email:'',
        street_address:'',
        city:"",
        state:"",
        country:"",
        post_code:"",
        mobile:'',
        e_balance: '0',
        ibo_status: 0,
        pc_balance: 0,
        paid_status:0,
        area_coordinator:0,
        path:"",
        commission_balance:0
    },
    languages:[]
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers:{

        setAuth: (state, action) => {
            return  {
            ...state,
                isLoggedIn: action.payload ? true:false,
                token: action.payload
            }
        },

        setCurrentUserData: (state, action) => {

            return{
                ...state,
                currentUser: action.payload
            }
        },
        // for check referal
        setReferral:(state,action)=>{
            return{
                ...state,
                referral: action.payload
            }

        },
        setLanguages:(state,action)=>{
            return{
                ...state,
                languages:action.payload
            }
            },

        resetStore:  state => initialState,
    },
})
  
  // Action creators are generated for each case reducer function
  export const { setAuth, setCurrentUserData, setReferral, resetStore,setLanguages } = authSlice.actions;

  export default authSlice.reducer;