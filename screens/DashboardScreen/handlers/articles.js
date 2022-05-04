import {updateArticles, resetArticles, updateFilteredArticles, incrementPageNumber, resetPageNumber} from '../../../redux/feature/articlesSlice'
import { useSelector } from "react-redux";


export const handleUpdateArticles = (batch,articleIDs,dispatch) => {        
    if (batch){ // check that batch is not an empty list
    batch.forEach(element => {
        if(!articleIDs.filter(obj => obj["_id"]==element["_id"]).length){ // check if element is already added
            dispatch(updateArticles(element));
        }
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