import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading : true,
    error : null
}


// export const  login = createAsyncThunk(
//     "Info/Account/Login",
//     async(values, {rejectWithValue})=>{
//         try{
            
//         }
//     }
// )
const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
    
    }
});

export const {

} = slice.actions
export default slice.reducer