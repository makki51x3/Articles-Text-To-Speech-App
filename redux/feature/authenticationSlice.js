import { createSlice } from "@reduxjs/toolkit";
  
  const initialState = {
    userName:"",
    password:"",
    accessToken: ""
  };
  
  export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
      updateAccessToken: (state, action) => {
        state.accessToken=action.payload;
      },
      updateUserName: (state, action) => {
        state.userName=action.payload;
      },
      updatePassword: (state, action) => {
        state.password=action.payload;
      },
    },
  });
  
  export const { updateAccessToken, updatePassword, updateUserName  } = authenticationSlice.actions;
  
  export default authenticationSlice.reducer;