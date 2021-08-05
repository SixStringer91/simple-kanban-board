import {
  SET_ASSIGNEE,
  SET_TITLE,
  SET_DESCRIPTION,
  SET_ASSIGNEE_LIST,
  DELETE_FROM_ASSIGNEE_LIST,
  RESET_FORM
} from '../utils/constants';

export const setAssigneeAC = (payload) => ({
  type: SET_ASSIGNEE,
  payload
});

export const setTitleAC = (payload) => ({
  type: SET_TITLE,
  payload
});

export const setDescriptionAC = (payload) => ({
  type: SET_DESCRIPTION,
  payload
});

export const setAssigneeListAC = (payload) => ({
  type: SET_ASSIGNEE_LIST,
  payload
});

export const deleteFromAssigneeListAC = (payload) => ({
  type: DELETE_FROM_ASSIGNEE_LIST,
  payload
});

export const resetTaskFormAC = () => ({
  type: RESET_FORM
});

export const initialState = {
  title: '',
  assignee: '',
  assigneeList: [],
  description: ''
};

export const reducer = (state, action) => {
  const list = [...state.assigneeList];
  switch (action.type) {
    case SET_ASSIGNEE:
      return {
        ...state,
        assignee: action.payload
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload
      };
    case SET_ASSIGNEE_LIST:
      list.push(action.payload);
      return {
        ...state,
        assignee: '',
        assigneeList: [...list]
      };
    case DELETE_FROM_ASSIGNEE_LIST:
      list.splice(action.payload, 1);
      return {
        ...state,
        assigneeList: [...list]
      };
    case RESET_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
