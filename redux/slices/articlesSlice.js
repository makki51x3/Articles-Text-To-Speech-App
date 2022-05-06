import { createSlice } from "@reduxjs/toolkit";
  
  const initialState = {
    articles: [],
    filteredArticles: [],
    currentPageNumber: 0,
  };
  
  export const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
      updateArticles: (state, action) => {
        state.articles.push(action.payload);
      },
      resetArticles: (state) => {
        state.articles= [];
      },
      resetPageNumber: (state)=>{
        state.currentPageNumber=0;
      },
      incrementPageNumber: (state)=>{
        state.currentPageNumber=state.currentPageNumber+1;
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
        updateFilteredArticles, 
        resetArticles, 
        updateArticles, 
        updatePageNumber,
        incrementPageNumber,
        resetPageNumber,
        } = articlesSlice.actions;
  
  export default articlesSlice.reducer;