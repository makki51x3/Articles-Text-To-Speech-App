import { createSlice } from "@reduxjs/toolkit";
  
  const initialState = {
    credentials:{user:"", pass:""},
    accessToken: "",
    state:{
      loading:false,
      loginFailed: false,
      passwordVisible:false
    }
  };

  export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
      updateUserName: (state, action) => {
        state.credentials.user=action.payload;
      },
      updatePassword: (state, action) => {
        state.credentials.pass=action.payload;
      },
      updateAccessToken: (state, action) => {
        state.accessToken=action.payload;
      },
      updateLoading:(state, action) => {
        state.state.loading=action.payload;
      },
      updateLoginFailed:(state, action) => {
        state.state.loginFailed=action.payload;
      },
      updatePasswordVisible:(state, action) => {
        state.state.passwordVisible=action.payload;
      },
    },
  });
  
  export const { 
    updateUserName, 
    updatePassword,
    updateAccessToken, 
    updateLoading, 
    updateLoginFailed, 
    updatePasswordVisible } = authenticationSlice.actions;
  
  export default authenticationSlice.reducer;