import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  error: null,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTasks: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setRemoveTask: (state, action) => {
      state.tasks = state.tasks.filter((item) => item._id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTasks, setError, setTasks, setRemoveTask } =
  taskSlice.actions;

export const addTask = (data, callback) => async (dispatch) => {
  try {
    const resp = await axios({
      method: "post",
      url: "/api/task/create",
      data: data,
    });

    dispatch(addTasks(resp.data.savedTask));
    callback();
  } catch (error) {
    dispatch(setError(error));
  }
};
export const getAllTasks = (id) => async (dispatch) => {
  try {
    const resp = await axios.get(`/api/task/create?id=${id}`);
    dispatch(setTasks(resp.data.tasks));
  } catch (error) {
    dispatch(setError(error));
  }
};
export const deleteTask = (id, callback) => async (dispatch) => {
  try {
    const resp = await axios.delete(`/api/task/create?id=${id}`);
    dispatch(setRemoveTask(id));
    callback();
  } catch (error) {
    dispatch(setError(error));
  }
};

export const taskSelector = (state) => state.tasks;

export default taskSlice.reducer;
