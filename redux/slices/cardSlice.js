import { createSlice } from "@reduxjs/toolkit";
  
    const initialState = {
        speechIcon: "play-circle-outline",
        viewContent: "",
    };
    
    export const cardSlice = createSlice({
        name: "card",
        initialState,
        reducers: {
            updateSpeechIcon: (state, action) => {
                state.speechIcon= action.payload;
            },
            updateViewContent: (state, action) => {
                state.viewContent= action.payload;
            },
        },
    });
  
    export const { 
        updateSpeechIcon,
        updateViewContent,} = cardSlice.actions;
  
  export default cardSlice.reducer;