import {updateArticles, resetArticles, updateFilteredArticles, incrementPageNumber, resetPageNumber} from '../../../redux/feature/articlesSlice'

export const handleUpdateArticles = (batch,dispatch) => {        
    if (batch){ // check that batch is not an empty list
    batch.forEach(element => {
    dispatch(updateArticles(element));
    });
    dispatch(incrementPageNumber());
    }
}; 

export const handleResetArticles = (dispatch) => {        
    dispatch(resetArticles());
}; 

export const handleResetPageNumber = (dispatch) => {
    dispatch(resetPageNumber());
};

export const handleUpdateFilteredArticles = (filter,currentList, dispatch) => {
    dispatch(updateFilteredArticles({filter,currentList}));
}; 

export default {handleUpdateArticles,handleResetArticles,handleUpdateFilteredArticles,handleResetPageNumber};