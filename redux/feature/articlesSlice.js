import { createSlice } from "@reduxjs/toolkit";
  
  const initialState = {
    articles: []
  };
  
  export const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
      updateArticles: (state, action) => {
        state.articles.push(action.payload);
      }
    },
  });
  
  export const { updateArticles } = articlesSlice.actions;
  
  export default articlesSlice.reducer;