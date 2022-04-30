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
      },
      updateFilteredArticles: (state, action) => {
        console.log("state payload slice",action.payload);
        state.filteredArticles=[];
        if(action.payload.currentList!=[]){
            action.payload.currentList.forEach((element,index) => {
                if(element.abstract.includes(action.payload.filter) || element.headline.main.includes(action.payload.filter)){
                    state.filteredArticles.push(element);
                }
            }); 
        }
      },
    },
  });
  
  export const { updateFilteredArticles, updateArticles, updatePageNumber } = articlesSlice.actions;
  
  export default articlesSlice.reducer;