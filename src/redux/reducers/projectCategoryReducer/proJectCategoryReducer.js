import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../utils/baseUrl";
import { history } from "../../../utils/history";

const initialState = {
  arrProjectCategory: [],
};

const proJectCategoryReducer = createSlice({
  name: "proJectCategoryReducer",
  initialState,
  reducers: {
    getArrProjectCategory: (state, { type, payload }) => {
      state.arrProjectCategory = payload;
    },
  },
});

export const { getArrProjectCategory } = proJectCategoryReducer.actions;

export default proJectCategoryReducer.reducer;

export const callProjectCategory = () => async (dispatch) => {
  try {
    const apiProjectCategory = await http.get("/ProjectCategory");
    dispatch(getArrProjectCategory(apiProjectCategory.data.content));
  } catch (err) {
    console.log(err.response?.data);
  }
};

export const callcreateProject = (values) => async (dispatch) => {
  try {
    const apicreateProject = await http.post(
      "/Project/createProjectAuthorize",
      values
    );
    alert("Đăng ký thành công");
    history.push("/projectmanagement");
  } catch (err) {
    alert("Bạn cần đăng nhập đễ tạo Project");
    history.push("/login");
    console.log(err.response?.data);
  }
};
