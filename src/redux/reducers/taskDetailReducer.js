import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";

const initialState = {
  taskDetail: {
    priorityTask: {
      priorityId: 1,
      priority: "High",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 3433,
        avatar: "https://ui-avatars.com/api/?name=thanhsonhoc",
        name: "thanhsonhoc",
        alias: "thanhsonhoc",
      },
      {
        id: 3464,
        avatar: "https://ui-avatars.com/api/?name=Ngo Thanh Phong1",
        name: "Ngo Thanh Phong1",
        alias: "ngo-thanh-phong1",
      },
    ],
    lstComment: [],
    taskId: 7766,
    taskName: "thanhfdđ",
    alias: "thanhfdd",
    description:
      '<p><span style="background-color: rgb(241, 196, 15);"><em>eqweqweqweqweqwe</em></span></p>',
    statusId: "4",
    originalEstimate: 24,
    timeTrackingSpent: 12,
    timeTrackingRemaining: 12,
    typeId: 2,
    priorityId: 1,
    projectId: 10236,
  },
};

const taskDetailReducer = createSlice({
  name: "taskDetailReducer",
  initialState,
  reducers: {
    getTaskDetail: (state, { type, payload }) => {
      state.taskDetail = payload;
    },
  },
});

export const { getTaskDetail } = taskDetailReducer.actions;

export default taskDetailReducer.reducer;

export const callTaskDetail = (taskId) => async (dispatch) => {
  try {
    const apiTaskDetail = await http.get(
      `/Project/getTaskDetail?taskId=${taskId}`
    );
    dispatch(getTaskDetail(apiTaskDetail.data.content));
  } catch (err) {
    console.log("lỗi TaskDetail", err.response?.data);
  }
};
