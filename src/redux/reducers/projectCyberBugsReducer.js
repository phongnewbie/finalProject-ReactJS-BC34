import { createSlice } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";

import { http } from "../../utils/baseUrl";
import { history } from "../../utils/history";
import { closeVisible } from "./drawerCyberbugs";

const initialState = {
  projectList: [],
  userProject: {},
  projectDetail: {},
  createTask: {},
};

const projectCyberBugsReducer = createSlice({
  name: "projectCyberBugsReducer",
  initialState,
  reducers: {
    getProjectList: (state, { type, payload }) => {
      state.projectList = payload;
    },
    getUserProjectt: (state, { type, payload }) => {
      state.userProject = payload;
    },
    getProjectDetail: (state, { type, payload }) => {
      state.projectDetail = payload;
    },
    getCreateTask: (state, { type, payload }) => {
      state.projectDetail = payload;
    },
  },
});

export const {
  getProjectList,
  getUserProjectt,
  getProjectDetail,
  getCreateTask,
} = projectCyberBugsReducer.actions;

export default projectCyberBugsReducer.reducer;

export const callProjectList = () => async (dispatch) => {
  try {
    const apiProjectList = await http.get("/Project/getAllProject");
    console.log("hihi", apiProjectList);
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

export const callDeleteUserProject = (user) => async (dispatch) => {
  try {
    const apiDeleteUserProject = await http.post(
      "/Project/removeUserFromProject",
      user
    );
    const apiProjectList = await http.get("/Project/getAllProject");
    dispatch(getProjectList(apiProjectList.data.content));
    dispatch(getUserProjectt(apiDeleteUserProject));
  } catch (err) {
    console.log(err.response?.data);
  }
};

export const callCreateTask = (taskOpject) => async (dispatch) => {
  try {
    const apiCreateTask = await http.post("/Project/createTask", taskOpject);
    console.log(apiCreateTask.data.content);
    dispatch(getCreateTask(apiCreateTask.data.content));
    dispatch(closeVisible());
    alert("Create task successfulty !");
    window.location.reload();
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data.message);
  }
};

export const callGetProjectDetail = (projectId) => async (dispatch) => {
  console.log("projectId", projectId);
  try {
    const apigetProjectDetail = await http.get(
      `/Project/getProjectDetail?id=${projectId}`
    );

    dispatch(getProjectDetail(apigetProjectDetail.data.content));
  } catch (err) {
    console.log(err.response?.data);
    // history.push("/");
  }
};
