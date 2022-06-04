import axios from "axios";
import {updateAccessToken, updateWarningText } from "../../../redux/slices/authenticationSlice"
import {updateLoading, updateLoginFailed} from "../../../redux/slices/loginPageSlice"

export const handleLogin = (navigation,dispatch,userName,password) => {

  // Setup required http headers
  const config = { 
    headers: {
      'Content-Type': 'application/json', 
      'accept': 'application/json'
    }
  };

  // enable loading 
  dispatch(updateLoading(true));
  
  // Initiate a post request with username and password to Login API
  axios.post(
    "http://34.245.213.76:3000" + "/auth/signin", 
    {"username":userName, "password":password},
    config,)
  .then(
    (response) => { 
    // reset LoginFailed and Loading flags
    dispatch(updateLoginFailed(false));
    dispatch(updateLoading(false));

    if (response.status >= 200 && response.status <= 299){ //check for successful status code
      dispatch(updateAccessToken(response.data.accessToken));
      navigation.navigate("DashboardScreen"); // navigate to dashboard
    }
    },
    (error) => { // stop loading, display login failed, and reset placeholders
      if(error.response.status==401){  // upon authorization error
        dispatch(updateWarningText("Invalid username or password!"));
      }
      else{ // for other errors such as timeout, invalid connection, etc.
        dispatch(updateWarningText("An error occured while connecting!"));
      }
      dispatch(updateLoading(false));
      dispatch(updateLoginFailed(true));
    }
  );
};

export default handleLogin;