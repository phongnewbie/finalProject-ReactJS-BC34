import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";

const initialState = {
  arrPriority: [],
};

const priorityReducer = createSlice({
  name: "priorityReducer",
  initialState,
  reducers: {
    getPriority: (state, { type, payload }) => {
      state.arrPriority = payload;
    },
  },
});

export const { getPriority } = priorityReducer.actions;

export default priorityReducer.reducer;

export const callgetPriority = (id) => async (dispatch) => {
  try {
    const apigetPriority = await http.get(`/Priority/getAll`);
    dispatch(getPriority(apigetPriority.data.content));
  } catch (err) {
    console.log("lỗi priority", err.response?.data);
  }
};
