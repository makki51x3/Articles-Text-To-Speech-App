import { createSlice } from "@reduxjs/toolkit";
  
    const initialState = {
        speechIcon: "play-circle-outline",
        speechSpeed: 1,
        availableVoices: [],
        selectedVoice:"",
    };
    
    export const speechSlice = createSlice({
        name: "speech",
        initialState,
        reducers: {
            updateSpeechIcon: (state, action) => {
                state.speechIcon= action.payload;
            },
            updateSpeechSpeed: (state, action) => {
                if(action.payload==2){ // set speed to x0.5 once it reaches x2
                    state.speechSpeed= 0.5;
                }
                else{
                    state.speechSpeed= action.payload+0.25; // increment speech speed by x0.5
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
        updateSpeechSpeed,
        updateSelectedVoice,
        updateAvailableVoices,
        resetAvailableVoices} = speechSlice.actions;
  
  export default speechSlice.reducer;