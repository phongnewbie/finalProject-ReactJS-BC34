import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../utils/baseUrl';
import { history } from '../../utils/history';
import { USER_LOGIN } from '../../utils/constant';

import { getStringLocal, saveStringLocal, removeLocal, } from '../../utils/config';
const initialState = {
    accountInfo: {},
}

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        getAccount : (state, {type,payload}) =>{
            state.accountInfo = payload
        }
    }
});
export const {getAccount} = userReducer.actions
export default userReducer.reducer
export const getAccountInfo = async(dispatch)=>{
    try{
        const getApiUser = await http.post("/Users/getUser")
        dispatch(getAccount(getApiUser.data.content))
    }catch(err){
        console.log(err);
        removeLocal(USER_LOGIN);
    }
} 
export const callSignUp = (signUpInfo) => async(dispatch) =>{
try{
    const signUp = await http.post("/user/signup", signUpInfo);
    alert("Đăng ký thành công");
    history.push("/login")
}catch(err){
    alert("Hong đăng ký được")
}
}
export const callSignIn = (signInInfo) => async(dispatch) =>{
    try{
        const signIn = await http.post("/user/signin", signInInfo);
        console.log(signIn);
        saveStringLocal(USER_LOGIN, signIn.data.content.accessToken);
        history.push("/")
    }catch(err){
        return new Promise((resolve, reject)=> resolve({isError: true, message: err.response.data.content}))
    }
    }

