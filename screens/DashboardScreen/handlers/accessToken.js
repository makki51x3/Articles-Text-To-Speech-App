import {updateAccessToken} from '../../../redux/feature/authenticationSlice'

export const handleUpdateAccessToken = (tkn,dispatch) => {
    if (!tkn) return;
    dispatch(updateAccessToken(tkn));
  };  

  export default handleUpdateAccessToken;