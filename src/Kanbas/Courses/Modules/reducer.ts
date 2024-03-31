import { createSlice } from "@reduxjs/toolkit";
import database from "../../Database";

const { modules } = database;



const initialState = {
  modules: [],
  module: { name: "New Module 123", description: "New Description" },
};


const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    
    setModules: (state, action) => {
      state.modules = action.payload;
    },

    addModule: (state : any, action) => {
      state.modules = [action.payload, ...state.modules];
    },

    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module : any) => module._id !== action.payload
      );
    },
    updateModule: (state : any, action : any) => {
      state.modules = state.modules.map((module : any) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
  },
});


export const { addModule, deleteModule, setModules,
  updateModule, setModule } = modulesSlice.actions;
export default modulesSlice.reducer;