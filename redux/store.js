import { configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "./feature/authenticationSlice";
import articlesReducer from "./feature/articlesSlice";

export const store = configureStore({
    reducer:{authenticationReducer,articlesReducer},
});
