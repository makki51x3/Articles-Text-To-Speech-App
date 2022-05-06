import {updateAccessToken, updatePassword, updateUserName} from '../../../redux/slices/authenticationSlice'

  export const handleUpdateAccessToken = (tkn,dispatch) => {
    if (!(typeof tkn === 'string')) return console.log("token should be a string!");   // check if token is a string
    dispatch(updateAccessToken(tkn));
  };  

  export const handleUpdateUserName = (usr,dispatch) => {
    if (!(typeof usr === 'string')) return console.log("user should be a string!");   // check if user is a string
    dispatch(updateUserName(usr));
  };  
  export const handleUpdatePassword = (pass,dispatch) => {
    if (!(typeof pass === 'string')) return console.log("pass should be a string!");   // check if pass is a string
    dispatch(updatePassword(pass));
  };  

  export default {handleUpdateAccessToken, handleUpdateUserName, handleUpdatePassword};