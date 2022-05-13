import { createSlice } from "@reduxjs/toolkit";
import {timeToRead} from "../../screens/DashboardScreen/handlers/timeToRead"

const initialState = {
    searchBarVisible: false,
    advancedSearchVisible: false,
    filteredArticles: [],
    filter: "",
    advancedOptions:{
        sortOrder:true,  // Ascending (by default) or Descending
        searchIn:{      // include in search if true, else don't
            headline:true,
            author:true,
            abstract:true,
            body:true
        },
        timeToRead:0 // 0: all (default), 1: (less than 3 minutes), 2: (between 3 and 10 minutes), 3: (more than 10 minutes)
    }
};

export const searchSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
        state.filter=action.payload.toLowerCase();
    },
    updateSearchBarVisible: (state, action) => {
        state.searchBarVisible=action.payload;
    },
    updateAdvancedSearchVisible: (state, action) => {
        state.advancedSearchVisible=action.payload;
    },
    updateFilteredArticles: (state, action) => {
        state.filteredArticles=[];
        const added = new Set();  // set data structure to track only unique IDs of added children
        
        console.log("initially:\t",added);
        if(action.payload){  // if pattern matches add the element to array
            action.payload.forEach((element) => { // works irrelevant of the letter case
                if( // In headline
                    state.advancedOptions.searchIn.headline 
                    && 
                    element.headline.main
                    &&
                    element.headline.main.toLowerCase().includes(state.filter)
                ){
                    added.add(element);
                }

                if(  // In Author
                    state.advancedOptions.searchIn.author 
                    &&
                    element.byline.original 
                    &&
                    element.byline.original.toLowerCase().includes(state.filter)
                ){
                    added.add(element);
                }

                if(  // In Abstract
                    state.advancedOptions.searchIn.abstract 
                    && 
                    element.abstract
                    &&
                    element.abstract.toLowerCase().includes(state.filter)
                ){
                    added.add(element);
                }
                
                if(  // In Body
                    state.advancedOptions.searchIn.body 
                    &&
                    element.lead_paragraph
                    && 
                    element.lead_paragraph.toLowerCase().includes(state.filter)
                ){
                    added.add(element);
                }
            }); 
            added.forEach(
                (card)=>{
                    switch (state.advancedOptions.timeToRead) { // Time to Read removes from set instead of adding to it
                        case 0: 
                            // added.add(element);
                            state.filteredArticles.push(card)
                            break;
    
                        case 1: 
                            if(timeToRead(card.word_count)<=3){
                                state.filteredArticles.push(card)
                            }                        
                            break;   
    
                        case 2: 
                            if(timeToRead(card.word_count)>3 && timeToRead(card.word_count)<=10){
                                state.filteredArticles.push(card)
                            }
                            break;
    
                        case 3:
                            if(timeToRead(card.word_count)>10){
                                state.filteredArticles.push(card)
                            }                        
                            break; 
                        
                        default:
                            console.log("time to read value should be either:0,1,2 or 3");
                            break;
                    }
                }
            );
        }
        console.log("finally:\t",added);
    },
    updateSortOrder: (state, action) => {
        state.advancedOptions.sortOrder=action.payload;
    },
    updateSearchInHeadline: (state, action) => {
        state.advancedOptions.searchIn.headline=action.payload;
    },
    updateSearchInAuthor: (state, action) => {
        state.advancedOptions.searchIn.author=action.payload;
    },
    updateSearchInAbstract: (state, action) => {
        state.advancedOptions.searchIn.abstract=action.payload;
    },
    updateSearchInBody: (state, action) => {
        state.advancedOptions.searchIn.body=action.payload;
    },
    updateTimeToRead: (state, action) => {
        state.advancedOptions.timeToRead=action.payload+1;
        if(action.payload==3){ // loop back to zero once maximum reached
            state.advancedOptions.timeToRead=0;
        }
    },
  },
});

export const { 
    updateSearchBarVisible,
    updateAdvancedSearchVisible,
    updateFilteredArticles,
    updateSortOrder,
    updateSearchInHeadline,
    updateSearchInAuthor,
    updateSearchInAbstract,
    updateSearchInBody,
    updateTimeToRead,
    updateFilter} = searchSlice.actions;

export default searchSlice.reducer;
