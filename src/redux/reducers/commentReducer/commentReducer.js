import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../utils/baseUrl";

const initialState = {
  contentComment: [],
  insertComment: {
    taskId: 0,
    contentComment: "",
  },
};

const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    getContentComment: (state, { type, payload }) => {
      state.contentComment = payload;
    },
    getInsertComment: (state, { type, payload }) => {
      state.insertComment = payload;
    },
    getDeleteComment: (state, { type, payload }) => {
      state.contentComment = payload;
    },
  },
});

export const { getContentComment, getInsertComment, getDeleteComment } =
  commentReducer.actions;

export default commentReducer.reducer;

export const callContentComment = (taskId) => async (dispatch) => {
  try {
    const apiContentComment = await http.get(
      `/Comment/getAll?taskId=${taskId}`
    );

    dispatch(getContentComment(apiContentComment.data.content));
  } catch (err) {
    console.log("lỗi contentComment", err.response?.data);
  }
};

export const callInsertComment = (id) => async (dispatch) => {
  console.log("id", id);
  try {
    const apiInsertComment = await http.post("/Comment/insertComment", id);

    const apiContentComment = await http.get(
      `/Comment/getAll?taskId=${id.taskId}`
    );
    dispatch(getInsertComment(apiInsertComment.data.content));

    console.log(apiContentComment.data.content);
    // dispatch(getContentComment(apiContentComment.data.content));
  } catch (err) {
    console.log("lỗi contentComment", err.response?.data);
  }
};

export const callDeleteComment = (id) => async (dispatch) => {
  try {
    const apiDeleteComment = await http.delete(
      `/Comment/deleteComment?idComment=${id}`
    );
    console.log(id);

    // dispatch(getDeleteComment(apiDeleteComment.data.content));
  } catch (err) {
    console.log("lỗi deleteComment", err.response?.data);
  }
};
