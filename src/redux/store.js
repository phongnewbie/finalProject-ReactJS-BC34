//redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import proJectCategoryReducer from "./reducers/projectCategoryReducer/proJectCategoryReducer";
import projectCyberBugsReducer from "./reducers/projectCyberBugsReducer";
import drawerCyberbugs from "./reducers/drawerCyberbugs";
import drawerCyberReducer from "./reducers/drawerCyberReducer";
import projectReducer from "./reducers/projectReducer";
import userReducer from "./reducers/userReducer/userReducer";
import taskTypeReducer from "./reducers/taskTypeReducer";
import priorityReducer from "./reducers/priorityReducer";
import statusReducer from "./reducers/statusReducer";
import taskDetailReducer from "./reducers/taskDetailReducer";
import updateProjectReducer from "./reducers/updateProject/updateProjectReducer";

export const store = configureStore({
  reducer: {
    proJectCategoryReducer,
    projectCyberBugsReducer,
    drawerCyberbugs,
    drawerCyberReducer,
    projectReducer,
    userReducer,
    taskTypeReducer,
    priorityReducer,
    statusReducer,
    taskDetailReducer,
    updateProjectReducer,
  },
});

//redux
// import { combineReducers, createStore } from 'redux';
// import { DemoReducer } from './reducers/DemoReducer';

// const rootReducer = combineReducers({
//   DemoReducer
// })

// export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
