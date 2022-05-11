import { createSlice } from "@reduxjs/toolkit";
  
  const initialState = {
    articles: [],
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
    },
  });
  
    export const { 
        resetArticles, 
        updateArticles, 
        updatePageNumber,
        incrementPageNumber,
        resetPageNumber,
        } = articlesSlice.actions;
  
  export default articlesSlice.reducer;