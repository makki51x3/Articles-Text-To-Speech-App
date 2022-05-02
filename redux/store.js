import { configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "./feature/authenticationSlice";
import articlesReducer from "./feature/articlesSlice";

export const store = configureStore({
    reducer:{authenticationReducer,articlesReducer},
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false,
    //   }) // disable middleware warnings
});
