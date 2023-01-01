import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer/userReducer";
import { callSignIn } from "./userReducer/userReducer";
import { callSignUp } from "./userReducer/userReducer";
import { deleteJob } from "../redux/reducers/userReducer/projectJob";
import { createJob } from "../redux/reducers/userReducer/projectJob";
export const store = configureStore({
    reducer:{
        callSignIn,
        callSignUp,
        deleteJob,
        createJob,  
    },
}); 