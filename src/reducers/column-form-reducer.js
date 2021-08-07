import {
  SET_COLOR, SET_TITLE, RESET_FORM, BASE_COLOR
} from '../utils/constants';

export const setColorAC = (payload) => ({
  type: SET_COLOR,
  payload
});

export const setTitleAC = (payload) => ({
  type: SET_TITLE,
  payload
});

export const resetColumnFormAC = () => ({
  type: RESET_FORM
});

export const initialState = {
  title: '',
  color: BASE_COLOR
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_COLOR:
      return {
        ...state,
        color: action.payload
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case RESET_FORM:
      return {
        ...state,
        title: '',
        color: BASE_COLOR
      };
    default:
      return state;
  }
};
