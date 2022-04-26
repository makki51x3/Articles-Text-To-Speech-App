import { createSlice } from "@reduxjs/toolkit";
  
  const initialState = {
    accessToken: "",
  };
  
  export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
      updateAccessToken: (state, action) => {
        state.accessToken=action.payload;
      }
    },
  });
  
  export const { updateAccessToken } = authenticationSlice.actions;
  
  export default authenticationSlice.reducer;