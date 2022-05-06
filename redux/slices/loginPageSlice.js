import { createSlice } from "@reduxjs/toolkit";
  
  const initialState = {
    loading:false,
    loginFailed: false,
    passwordVisible:false
  };

  export const loginPageSlice = createSlice({
    name: "loginPage",
    initialState,
    reducers: {
      updateLoading:(state, action) => {
        state.loading=action.payload;
      },
      updateLoginFailed:(state, action) => {
        state.loginFailed=action.payload;
      },
      updatePasswordVisible:(state, action) => {
        state.passwordVisible=action.payload;
      },
    },
  });
  
  export const { 
    updateLoading, 
    updateLoginFailed, 
    updatePasswordVisible } = loginPageSlice.actions;
  
  export default loginPageSlice.reducer;