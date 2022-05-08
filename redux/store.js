import { configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice";
import articlesReducer from "./slices/articlesSlice";
import loginPageReducer from "./slices/loginPageSlice";
import dashBoardPageReducer from "./slices/dashBoardPageSlice";
import cardReducer from "./slices/cardSlice";

export const store = configureStore({
    reducer:{
        authenticationReducer,
        articlesReducer,
        loginPageReducer,
        dashBoardPageReducer,
        cardReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false,
    //   }) // disable middleware warnings
});
