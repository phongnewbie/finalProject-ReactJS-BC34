import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";
import { history } from "../../utils/history";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "<p>string</p>",
    categoryId: "2",
  },
};

const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    editProjact: (state, { type, payload }) => {
      state.projectEdit = payload;
    },
  },
});

export const { editProjact } = projectReducer.actions;

export default projectReducer.reducer;
export const callEditProject = (values) => async (dispatch) => {
  try {
    const apiEditProject = await http.put(
      `/Project/updateProject?projectId=${values.id}`,
      values
    );
    dispatch(editProjact(apiEditProject.data.content));
    console.log("gogogo", apiEditProject);
  } catch (err) {
    console.log("lỗi", err.response?.data.message);
  }
};

// export const callDeleteProject = (values) => async (dispatch) => {
//   try {
//     const apiDeleteProject = await http.delete(
//       `/Project/deleteProject?projectId=${values}`
//     );
//   } catch (err) {
//     console.log("lỗi", err.response?.data);
//   }
// };
