import { createSlice } from "@reduxjs/toolkit";
  
  const initialState = {
    credentials:{user:"", pass:""},
    accessToken: "",
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
    },
  });
  
  export const { 
    updateUserName, 
    updatePassword,
    updateAccessToken} = authenticationSlice.actions;
  
  export default authenticationSlice.reducer;