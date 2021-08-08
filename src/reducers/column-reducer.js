import {
  ADD_TASK,
  DELETE_TASK,
  SET_LOADER,
  SET_TASK_FORM,
  SET_ALL_TASKS,
  SET_TASK_IN_SAME_COLUMN,
  SET_TASK_FORM_SUBMIT
} from '../utils/constants';

export const addTaskAC = (payload) => ({
  type: ADD_TASK,
  payload
});

export const deleteTaskAC = (payload) => ({
  type: DELETE_TASK,
  payload
});

export const setLoaderAC = (payload) => ({
  type: SET_LOADER,
  payload
});

export const setTaskFormAC = (payload) => ({
  type: SET_TASK_FORM,
  payload
});

export const setTaskFormSubmitAC = (payload) => ({
  type: SET_TASK_FORM_SUBMIT,
  payload
});

export const setAllTasksAC = (payload) => ({
  type: SET_ALL_TASKS,
  payload
});

export const setTaskInSameColumnAC = (payload) => ({
  type: SET_TASK_IN_SAME_COLUMN,
  payload
});

export const initialState = {
  tasks: [],
  isLoader: true,
  taskForm: false
};

export const reducer = (state, action) => {
  const tasks = [...state.tasks];
  const { taskIndex, dragIndex } = action.payload;
  switch (action.type) {
    case ADD_TASK:
      tasks.splice(taskIndex, 0, action.payload.dragParams);
      return {
        ...state,
        isLoader: true,
        tasks: tasks.map((task, i) => ({ ...task, order: i }))
      };
    case DELETE_TASK:
      tasks.splice(action.payload, 1);
      return {
        ...state,
        isLoader: false,
        tasks: tasks.map((task, i) => ({ ...task, order: i }))
      };
    case SET_LOADER:
      return {
        ...state,
        isLoader: action.payload
      };
    case SET_TASK_FORM:
      return {
        ...state,
        taskForm: action.payload
      };
    case SET_TASK_FORM_SUBMIT:
      return {
        ...state,
        isLoader: true,
        taskForm: action.payload
      };
    case SET_ALL_TASKS:
      return {
        ...state,
        isLoader: false,
        tasks: [...action.payload]
      };
    case SET_TASK_IN_SAME_COLUMN:
      tasks.splice(taskIndex, 0, tasks.splice(dragIndex, 1)[0]);
      return {
        ...state,
        isLoader: true,
        tasks
      };

    default:
      return state;
  }
};
