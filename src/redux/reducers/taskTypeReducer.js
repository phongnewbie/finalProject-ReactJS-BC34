import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";

const initialState = {
  arrTaskType: [],
};

const taskTypeReducer = createSlice({
  name: "taskTypeReducer",
  initialState,
  reducers: {
    getTaskTypeProjact: (state, { type, payload }) => {
      state.arrTaskType = payload;
    },
  },
});

export const { getTaskTypeProjact } = taskTypeReducer.actions;

export default taskTypeReducer.reducer;

export const callTaskTypeProjact = () => async (dispatch) => {
  try {
    const apiTaskTypeProjact = await http.get("/TaskType/getAll");
    dispatch(getTaskTypeProjact(apiTaskTypeProjact.data.content));
  } catch (err) {
    console.log("lỗi type", err.response?.data);
  }
};
