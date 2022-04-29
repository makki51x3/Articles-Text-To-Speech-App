import {updateArticles, updatePageNumber} from '../../../redux/feature/articlesSlice'

export const handleUpdateArticles = (batch,dispatch) => {
    if (!batch) return;
    batch.forEach(element => {
      dispatch(updateArticles(element));
    });
  }; 

export const handleUpdatePageNumber = (num,dispatch) => {
    dispatch(updatePageNumber(num));
}; 

export default {handleUpdateArticles,handleUpdatePageNumber};