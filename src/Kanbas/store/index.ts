import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
export interface KanbasState {
  quizReducer: any;
  modulesReducer: {
    modules: any[];
    module: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer
  }
});


export default store;