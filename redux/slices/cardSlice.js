import { createSlice } from "@reduxjs/toolkit";
  
    const initialState = {
        speechIcon: "play-circle-outline",
        speechSpeed: 1,
        viewContent: "",
        availableVoices: [],
        selectedVoice:"",
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
            updateSpeechSpeed: (state, action) => {
                if(action.payload==2){ // set speed to x0.5 once it reaches x2
                    state.speechSpeed= 0.5;
                }
                else{
                    state.speechSpeed= action.payload+0.5; // increment speech speed by x0.5
                }
            },
            updateSelectedVoice: (state, action) => {
                state.selectedVoice= action.payload;
            },
            updateAvailableVoices: (state, action) => {
                state.availableVoices.push(action.payload);
            },
            resetAvailableVoices: (state) => {
                state.availableVoices=[];
            },
        },
    });
  
    export const { 
        updateSpeechIcon,
        updateViewContent,
        updateSpeechSpeed,
        updateSpeechSpeaker,
        updateAvailableVoices,
        resetAvailableVoices,
        updateSelectedVoice} = cardSlice.actions;
  
  export default cardSlice.reducer;