import { createSlice } from "@reduxjs/toolkit";
  
  const initialState = {
    credentials:{user:"", pass:""},
    accessToken: "",
    warningText: "Invalid username or password!"
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
      updateWarningText: (state, action) => {
        state.warningText=action.payload;
      },
    },
  });
  
  export const { 
    updateUserName, 
    updatePassword,
    updateAccessToken,
    updateWarningText } = authenticationSlice.actions;
  
  export default authenticationSlice.reducer;