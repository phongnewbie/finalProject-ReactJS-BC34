import { createSlice } from "@reduxjs/toolkit";
import FormEditProject from "../../components/Forms/FormEditProject";

const initialState = {
  visible: false,
  compomenContentDrawer: <p>default</p>,
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
  },
});

export const { openVisible, closeVisible, openForm, setSubmitEdit } =
  drawerCyberbugs.actions;

export default drawerCyberbugs.reducer;

export const callOpenForm = () => (dispatch) => {
  const action = <FormEditProject />;
  dispatch(openForm(action));
};
