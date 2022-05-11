import { createSlice } from "@reduxjs/toolkit";
  
const initialState = {
  searchBarVisible: false,
  advancedSearchVisible: false,
  filteredArticles: []
};

export const searchSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    updateSearchBarVisible: (state, action) => {
        state.searchBarVisible=action.payload;
    },
    updateAdvancedSearchVisible: (state, action) => {
        state.advancedSearchVisible=action.payload;
    },
    updateFilteredArticles: (state, action) => {
        state.filteredArticles=[];
        if(action.payload.currentList!=[]){
            action.payload.currentList.forEach((element) => {
                // should work irrelevant of the letter case
                if(element.abstract.toLowerCase().includes(action.payload.filter.toLowerCase()) || element.headline.main.toLowerCase().includes(action.payload.filter.toLowerCase())){
                    state.filteredArticles.push(element);
                }
            }); 
        }
      },
  },
});

export const { 
    updateSearchBarVisible,
    updateAdvancedSearchVisible,
    updateFilteredArticles} = searchSlice.actions;

export default searchSlice.reducer;
