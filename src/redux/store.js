//redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import proJectCategoryReducer from "./reducers/projectCategoryReducer/proJectCategoryReducer";
import projectCyberBugsReducer from "./reducers/projectCyberBugsReducer";
import drawerCyberbugs from "./reducers/drawerCyberbugs";
import drawerCyberReducer from "./reducers/drawerCyberReducer";
import projectReducer from "./reducers/projectReducer";

export const store = configureStore({
  reducer: {
    proJectCategoryReducer,
    projectCyberBugsReducer,
    drawerCyberbugs,
    drawerCyberReducer,
    projectReducer,
  },
});

//redux
// import { combineReducers, createStore } from 'redux';
// import { DemoReducer } from './reducers/DemoReducer';

// const rootReducer = combineReducers({
//   DemoReducer
// })

// export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
