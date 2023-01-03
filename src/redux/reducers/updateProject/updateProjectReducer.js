import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../utils/baseUrl";
import {
  getProjectDetail,
  callGetProjectDetail,
} from "../projectCyberBugsReducer";

const initialState = {
  updateStatus: {
    taskId: 0,
    statusId: 0,
  },
};

const updateProjectReducer = createSlice({
  name: "updateProjectReducer",
  initialState,
  reducers: {
    getUpdateStatus: (state, { type, payload }) => {
      state.updateStatus = payload;
    },
  },
});

export const { getUpdateStatus } = updateProjectReducer.actions;

export default updateProjectReducer.reducer;

export const callUpdateStatus = (taskId) => async (dispatch) => {
  try {
    const apiUpdateStatus = await http.put("/Project/updateStatus", taskId);
    // dispatch(getUpdateStatus(apiUpdateStatus.data.content));
    dispatch(callGetProjectDetail(taskId.projectId));
  } catch (err) {
    console.log("lỗi TaskDetail", err.response?.data);
  }
};
