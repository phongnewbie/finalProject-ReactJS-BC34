import React from "react";

const initialState = {
  visible: false,
  compomenContentDrawer: <p>default</p>,
  callBackSubmit: (propsValue) => {
    alert("click demo!");
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUBMIT_EDIT":
      state.callBackSubmit = action.submitFunction;

      return { ...state };

    default:
      return state;
  }
};
