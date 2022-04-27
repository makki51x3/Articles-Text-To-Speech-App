import {updateArticles} from '../../../redux/feature/articlesSlice'
import {updateAccessToken} from '../../../redux/feature/authenticationSlice'

export const handleUpdateAccessToken = (tkn,dispatch) => {
    if (!tkn) return;
    dispatch(updateAccessToken(tkn));
  };  

export const handleUpdateArticles = (batch,dispatch) => {
    if (!batch) return;
    batch.forEach(element => {
      dispatch(updateArticles(element));
    });
  }; 