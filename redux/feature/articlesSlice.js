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
      updatePageNumber: (state,action)=>{
        state.currentPageNumber=action.payload;
      }
    },
  });
  
  export const { updateArticles, updatePageNumber } = articlesSlice.actions;
  
  export default articlesSlice.reducer;