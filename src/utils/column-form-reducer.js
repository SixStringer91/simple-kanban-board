const BASE_COLOR = '#F14668';
export const SET_COLOR = 'SET_COLOR';
export const SET_TITLE = 'SET_TITLE';
export const RESET_FORM = 'RESET_FORM';

export const setColorAC = (payload) => ({
  type: SET_COLOR,
  payload
});

export const setTitleAC = (payload) => ({
  type: SET_TITLE,
  payload
});

export const resetFormAC = () => ({
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
