import { VIEW_DESCRIPTION, VIEW_DATE, VIEW_ASSIGNEE } from './constants';

export const initialState = {
  descriptionView: true,
  assigneeView: true,
  dateView: true
};

export const reducer = (state, action) => {
  switch (action.type) {
    case VIEW_DESCRIPTION:
      return {
        ...state,
        descriptionView: action.payload
      };
    case VIEW_DATE:
      return {
        ...state,
        dateView: action.payload
      };
    case VIEW_ASSIGNEE:
      return {
        ...state,
        assigneeView: action.payload
      };
    default:
      return state;
  }
};
