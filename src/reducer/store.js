import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer/userReducer";
import { callSignIn } from "./userReducer/userReducer";
import { callSignUp } from "./userReducer/userReducer";

export const store = configureStore({
    reducer:{
        callSignIn,
        callSignUp,  
    },
}); 