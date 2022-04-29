import {updateArticles, updatePageNumber} from '../../../redux/feature/articlesSlice'

export const handleUpdateArticles = (batch,dispatch) => {
    if (!batch) return;
    batch.forEach(element => {
      dispatch(updateArticles(element));
    });
  }; 

export const handleUpdatePageNumber = (batch,dispatch) => {
    if (!batch) return;
    batch.forEach(element => {
        dispatch(updatePageNumber(element));
    });
}; 

export default {handleUpdateArticles,handleUpdatePageNumber};