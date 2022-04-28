import {updateArticles} from '../../../redux/feature/articlesSlice'

const handleUpdateArticles = (batch,dispatch) => {
    if (!batch) return;
    batch.forEach(element => {
      dispatch(updateArticles(element));
    });
  }; 

export default handleUpdateArticles;