import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer/userReducer";

export const store = configureStore({
    reducer:{
        userReducer,
    }
})