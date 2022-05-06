import { configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice";
import articlesReducer from "./slices/articlesSlice";
import loginPageReducer from "./slices/loginPageSlice";

export const store = configureStore({
    reducer:{authenticationReducer,articlesReducer,loginPageReducer},
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false,
    //   }) // disable middleware warnings
});
