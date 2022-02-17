import { createSlice } from '@reduxjs/toolkit';

interface IState{

    translator: {
        id:number
        heading:string;
        subHeading:string,
        activeLanguageFlag:string,
        lectureHeading:string,
        leactureSubHeading:string,
        lectureWeidgetCer:string,
        lectureWeidgetPC:string,
        lectureWeidgetTC:string,
        lectureDetail:string,
        lectureDetailInfo:string,
        lectureDetailHigh:string
        lectureDetailAtt:string,
        lectureDetailAttenetion:string,
        quizHeading:string,
        quizbtn:string,
        quizpassedbtn:string,
        quizcoming:string

    },


}

const initialState:IState = {
    translator: {
        id: 0,
        heading: '',
        subHeading:'',
        activeLanguageFlag:'',
        lectureHeading:'',
        leactureSubHeading:'',
        lectureWeidgetCer:'',
        lectureWeidgetPC:'',
        lectureWeidgetTC:'',
        lectureDetail:'',
        lectureDetailInfo:'',
        lectureDetailHigh:'',
        lectureDetailAtt:'',
        lectureDetailAttenetion:'',
        quizHeading:'',
        quizbtn:'',
        quizpassedbtn:'',
        quizcoming:''
    },


};


export const tranlateSlice = createSlice({
    name: 'tranlator',
    initialState,
    reducers: {
        activeLanguage: (state, action) => {
            return{
                ...state,
                translator: action.payload
            }
            },
        resetStore:  state => initialState,
    },
})

// Action creators are generated for each case reducer function
export const {activeLanguage} = tranlateSlice.actions;

export default tranlateSlice.reducer;