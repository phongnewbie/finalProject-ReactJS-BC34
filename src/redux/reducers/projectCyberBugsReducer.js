import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";
import { history } from "../../utils/history";

const initialState = {
  projectList: [],
};

const projectCyberBugsReducer = createSlice({
  name: "projectCyberBugsReducer",
  initialState,
  reducers: {
    getProjectList: (state, { type, payload }) => {
      state.projectList = payload;
    },
  },
});

export const { getProjectList } = projectCyberBugsReducer.actions;

export default projectCyberBugsReducer.reducer;

export const callProjectList = () => async (dispatch) => {
  try {
    const apiProjectList = await http.get("/Project/getAllProject");
    dispatch(getProjectList(apiProjectList.data.content));
  } catch (err) {
    console.log(err.response?.data);
  }
};

export const callDeleteProject = (values) => async (dispatch) => {
  try {
    const apiDeleteProject = await http.delete(
      `/Project/deleteProject?projectId=${values}`
    );
    const apiProjectList = await http.get("/Project/getAllProject");
    alert("Xóa Project thành công");
    dispatch(getProjectList(apiProjectList.data.content));
  } catch (err) {
    console.log("lỗi", err.response?.data);
  }
};
