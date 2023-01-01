import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/baseUrl";

const initialState = {
  arrStatus: [],
};

const statusReducer = createSlice({
  name: "statusReducer",
  initialState,
  reducers: {
    getArrStatus: (state, { type, payload }) => {
      state.arrStatus = payload;
    },
  },
});

export const { getArrStatus } = statusReducer.actions;

export default statusReducer.reducer;

export const callArrStatus = () => async (dispatch) => {
  try {
    const apiArrStatus = await http.get("/Status/getAll");
    dispatch(getArrStatus(apiArrStatus.data.content));
  } catch (err) {
    console.log(err.response?.data);
  }
};
