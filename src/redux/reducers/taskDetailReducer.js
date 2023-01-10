import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";
import { closeVisible } from "./drawerCyberbugs";
import { history } from "../../utils/history";
import { getProjectDetail } from "./projectCyberBugsReducer";

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
    taskId: 8007,
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
    projectId: 10346,
  },
};

const taskDetailReducer = createSlice({
  name: "taskDetailReducer",
  initialState,
  reducers: {
    getTaskDetail: (state, { type, payload }) => {
      state.taskDetail = payload;
    },
    getTaskModal: (state, { type, payload }) => {
      const { name, value } = payload;
      state.taskDetail = { ...state.taskDetail, [name]: value };
    },
    getAssigness: (state, { type, payload }) => {
      state.taskDetail.assigness = [...state.taskDetail.assigness, payload];
    },
    getTaskDetailDelete: (state, { type, payload }) => {
      state.taskDetail.assigness = state.taskDetail.assigness.filter(
        (us) => us.id != payload
      );
    },
    getUpdateTask: (state, { type, payload }) => {
      const listUserAsign = state.taskDetail.assigness?.map((user, index) => {
        return user.id;
      });
      state.taskDetail = { ...payload, listUserAsign };
    },
  },
});

export const {
  getTaskDetail,
  getTaskModal,
  getAssigness,
  getTaskDetailDelete,
  getUpdateTask,
} = taskDetailReducer.actions;

export default taskDetailReducer.reducer;

export const callTaskDetail = (taskId) => async (dispatch) => {
  try {
    const apiTaskDetail = await http.get(
      `/Project/getTaskDetail?taskId=${taskId}`
    );
    // console.log("getTaskDetail", apiTaskDetail.data.content);
    dispatch(getTaskDetail(apiTaskDetail.data.content));
  } catch (err) {
    console.log("lỗi TaskDetail", err.response?.data);
  }
};

export const callTaskModal = (taskId) => async (dispatch) => {
  try {
    const apiTaskModal = await http.put("/Project/updateTask", taskId);
    dispatch(getTaskModal());
  } catch (err) {
    console.log("lỗi TaskDetail", err.response?.data);
  }
};

export const callUpdateTask = (taskUpdate) => async (dispatch) => {
  try {
    const apiUpdateTask = await http.post("/Project/updateTask", taskUpdate);

    dispatch(getProjectDetail(taskUpdate));
    window.location.reload(getProjectDetail(taskUpdate));

    console.log();
  } catch (err) {
    console.log("lỗi updateTask", err.response?.data);
    alert(err.response?.data.message);
  }
};
