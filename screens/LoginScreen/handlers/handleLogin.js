import axios from "axios";
import {updateAccessToken, updateLoading, updateLoginFailed } from "../../../redux/feature/authenticationSlice"


export const handleLogin = ({navigation,dispatch,userName,password}) => {

  // Setup required http headers
  const config = { headers: {'Content-Type': 'application/json', 'accept': 'application/json'}}

  // enable loading 
  dispatch(updateLoading(true));
  
  // Initiate a post request with username and password to Login API
  axios.post("http://34.245.213.76:3000" + "/auth/signin", {
    "username":userName,
    "password":password
  },config)
  .then((response) => { 
    // reset LoginFailed and Loading flags
    dispatch(updateLoginFailed(false));
    dispatch(updateLoading(false));

    if (response.status >= 200 && response.status <= 299){ //check for successful status code
      dispatch(updateAccessToken(response.data.accessToken));
      navigation.navigate("DashboardScreen"); // navigate to dashboard
    }
  },
  (error) => { // stop loading, display login failed, and reset placeholders
    dispatch(updateLoading(false));
    dispatch(updateLoginFailed(true));
  });
};

export default handleLogin;