import { createSlice } from "@reduxjs/toolkit";
import FormEditProject from "../../components/Forms/FormEditProject";
import FormCreateTask from "../../components/Forms/FormCreateTask";
import FormEditUser from "../../components/Forms/FormEditUser";

const initialState = {
  visible: false,
  title: "",
  compomenContentDrawer: <p>default</p>,
  callBackSubmit: (propsValue) => {
    alert("click demo!");
  },
};

const drawerCyberbugs = createSlice({
  name: "drawerCyberbugs",
  initialState,
  reducers: {
    openVisible: (state, { type, payload }) => {
      state.visible = true;
    },
    closeVisible: (state, { type, payload }) => {
      state.visible = false;
    },
    openForm: (state, { type, payload }) => {
      //   state.visible = true;
      state.compomenContentDrawer = payload;
    },
    openFormTask: (state, { type, payload }) => {
      //   state.visible = true;
      state.compomenContentDrawer = payload;
    },
    openFormUser: (state, { type, payload }) => {
      //   state.visible = true;
      state.compomenContentDrawer = payload;
    },
    titleName: (state, { type, payload }) => {
      //   state.visible = true;
      state.title = payload;
    },
    setCallBackSubmit: (state, { type, payload }) => {
      //   state.visible = true;
      state.callBackSubmit = payload;
    },
  },
});

export const {
  openVisible,
  closeVisible,
  openForm,
  setSubmitEdit,
  titleName,
  setCallBackSubmit,
  openFormTask,
  openFormUser,
} = drawerCyberbugs.actions;

export default drawerCyberbugs.reducer;

export const callOpenForm = () => (dispatch) => {
  const action = <FormEditProject />;
  dispatch(openForm(action));
};

export const callOpenFormCreateTask = () => (dispatch) => {
  const action = <FormCreateTask />;
  dispatch(openFormTask(action));
};

export const callOpenFormEditUser = () => (dispatch) => {
  const action = <FormEditUser />;
  dispatch(openFormUser(action));
};
