import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../utils/baseUrl";
import { history } from "../../../utils/history";
import { USER_LOGIN } from "../../../utils/constant";
import { getProjectList } from "../projectCyberBugsReducer";

import {
  getStringLocal,
  saveStringLocal,
  removeLocal,
} from "../../../utils/config";
const initialState = {
  arrUser: [],
  userSearch: [],
  arrUserSearch: [],
  assignUser: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getArrUser: (state, { type, payload }) => {
      state.arrUser = payload;
    },
    getUserSearch: (state, { type, payload }) => {
      state.userSearch = payload;
    },
    getUserByProjectId: (state, { type, payload }) => {
      state.arrUserSearch = payload;
    },
    getAssignUser: (state, { type, payload }) => {
      state.assignUser = payload;
    },
  },
});
export const { getArrUser, getUserSearch, getAssignUser, getUserByProjectId } =
  userReducer.actions;
export default userReducer.reducer;
export const callArrUser = () => async (dispatch) => {
  try {
    const getApiUser = await http.post("/Users/getUser");
    dispatch(getArrUser(getApiUser.data.content));
  } catch (err) {
    console.log("lỗi user", err.response?.data);
  }
};
export const callSignUp = (signUpInfo) => async (dispatch) => {
  try {
    const signUp = await http.post("/Users/signup", signUpInfo);
    alert("Đăng ký thành công");
    history.push("/login");
  } catch (err) {
    console.log("lỗi", err.response?.data.message);

    alert(err.response?.data.message);
  }
};
export const callSignIn = (signInInfo) => async (dispatch) => {
  try {
    const signUp = await http.post("/Users/signin", signInInfo);
    saveStringLocal(USER_LOGIN, signUp.data.content.accessToken);

    history.push("/");
  } catch (err) {
    return new Promise((resolve, reject) =>
      resolve({ isError: true, message: err.response.data.content })
    );
  }
};

export const callGetUser = (value) => async (dispatch) => {
  try {
    const getUser = await http.get(`/Users/getUser?keyword=${value}`);
    dispatch(getUserSearch(getUser.data.content));
  } catch (err) {
    console.log("lỗi", err.response?.data);
  }
};

export const callAssignUser = (value) => async (dispatch) => {
  try {
    const getAssignUser = await http.post("/Project/assignUserProject", value);

    const apiProjectList = await http.get("/Project/getAllProject");

    dispatch(getProjectList(apiProjectList.data.content));
    // dispatch(getAssignUser(getAssignUser));
  } catch (err) {
    console.log("lỗi data", err.response?.data);
    alert(err.response?.data.message);
  }
};

export const callUserByProjectId = (id) => async (dispatch) => {
  try {
    const apiUserByProjectId = await http.get(
      `/Users/getUserByProjectId?idProject=${id}`
    );
    console.log(apiUserByProjectId);
    dispatch(getUserByProjectId(apiUserByProjectId.data.content));
  } catch (err) {
    console.log("lỗi ByProjectId", err.response?.data);
    // dispatch(getUserByProjectId([]));
  }
};
