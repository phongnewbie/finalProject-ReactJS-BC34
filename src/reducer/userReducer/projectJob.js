import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../utils/baseUrl';

const initialState = {
    projectInfo: {}
}

const projectJob = createSlice({
    name: "projectJob",
    initialState,
    reducers: {
        getJob : (state,{type,payload})=>{
            state.projectInfo = payload
        },
    },
});
export const {getJob} = projectJob.reducer;

export const deleteJob = (projectId) = async(dispatch) =>{
    try{
        const deleteTask = await http.delete("/Project/deleteProject")
    }catch(err){
        alert("xóa thành công")
    }
}
export const createJob =(projectName) = async(dispatch) =>{
    try{
        const createTask = await http.post("/Project/createProjectAuthorize")
    }catch(err){
        alert("Tạo thành công");
    }
}
