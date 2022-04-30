import {updateArticles, resetArticles, updateFilteredArticles, updatePageNumber} from '../../../redux/feature/articlesSlice'

export const handleUpdateArticles = (batch,dispatch) => {        
    if (batch){ // check that batch is not an empty list
        batch.forEach(element => {
        dispatch(updateArticles(element));
        });
    }else{
        dispatch(resetArticles());
    }
}; 

export const handleUpdatePageNumber = (num,dispatch) => {
    if (!Number.isInteger(num)) return;  // check that number is an integer
    dispatch(updatePageNumber(num));
}; 

export const handleUpdateFilteredArticles = (filter,currentList, dispatch) => {
    dispatch(updateFilteredArticles({filter,currentList}));
}; 

export default {handleUpdateArticles,handleUpdateFilteredArticles,handleUpdatePageNumber};