import { createSlice } from "@reduxjs/toolkit";
  
const initialState = {
  loading: false,
  refresh: false,
  stopFetching: false,
};

export const dashBoardPageSlice = createSlice({
  name: "dashBoardPage",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
        state.loading=action.payload;
    },  
    updateRefresh: (state, action) => {
        state.refresh=action.payload;
    },
    updateStopFetching: (state, action) => {
        state.stopFetching=action.payload;
    },
  },
});

export const { 
    updateLoading, 
    updateRefresh,
    updateStopFetching} = dashBoardPageSlice.actions;

export default dashBoardPageSlice.reducer;
