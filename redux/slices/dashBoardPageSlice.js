import { createSlice } from "@reduxjs/toolkit";
  
const initialState = {
  loading: false,
  searchBarVisible: false,
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
    updateSearchBarVisible: (state, action) => {
        state.searchBarVisible=action.payload;
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
    updateSearchBarVisible,
    updateRefresh,
    updateStopFetching} = dashBoardPageSlice.actions;

export default dashBoardPageSlice.reducer;
