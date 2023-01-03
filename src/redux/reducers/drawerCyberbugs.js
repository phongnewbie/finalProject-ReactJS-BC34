import { createSlice } from "@reduxjs/toolkit";
import FormEditProject from "../../components/Forms/FormEditProject";

const initialState = {
  visible: false,
  title: "",
  compomenContentDrawer: <p>default</p>,
  callBackSubmit: (propsValue) => {
    alert("click demo!");
  },
  updateMethod: (value) =>{
    console.log("hello");
  }
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
    titleName: (state, { type, payload }) => {
      //   state.visible = true;
      state.title = payload;
    },
    setCallBackSubmit: (state, { type, payload }) => {
      //   state.visible = true;
      state.callBackSubmit = payload;
    },
    setUpdate:(state,{type,payload}) =>{
      state.updateMethod = payload 
    }
  },
});

export const {
  openVisible,
  closeVisible,
  openForm,
  setUpdate,
  titleName,
  setCallBackSubmit,
} = drawerCyberbugs.actions;

export default drawerCyberbugs.reducer;

export const callOpenForm = () => (dispatch) => {
  const action = <FormEditProject />;
  dispatch(openForm(action));
};
