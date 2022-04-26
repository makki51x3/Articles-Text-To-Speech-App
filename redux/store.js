import { configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "./feature/authenticationSlice";

export const store = configureStore({
    reducer:{authenticationReducer},
});
