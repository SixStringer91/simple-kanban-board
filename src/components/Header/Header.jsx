import React from 'react';
import {
  VIEW_DESCRIPTION,
  VIEW_ASSIGNEE,
  VIEW_DATE
} from '../../utils/constants';

function Header({ dispatch, state }) {
  const { descriptionView, assigneeView, dateView } = state;
  const viewParamsHandler = (e) => {
    const { id } = e.target;
    dispatch({
      type: id,
      payload: e.target.checked
    });
  };
  return (
    <div className="header">
      <div className="check-box__wrapper">

        <label className="custom-checkbox">
          <input
            type="checkbox"
            id={VIEW_DESCRIPTION}
            checked={descriptionView}
            value="yes"
            onChange={viewParamsHandler}
          />
          <span>Description</span>
        </label>
        <label className="custom-checkbox">
          <input
            type="checkbox"
            id={VIEW_ASSIGNEE}
            checked={assigneeView}
            value="yes"
            onChange={viewParamsHandler}
          />
          <span>Assignee</span>
        </label>
        <label className="custom-checkbox">
          <input
            type="checkbox"
            id={VIEW_DATE}
            checked={dateView}
            value="yes"
            onChange={viewParamsHandler}
          />
          <span>Publish date</span>
        </label>
      </div>
    </div>
  );
}

export default Header;
