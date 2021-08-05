import React from 'react';
import { deleteFromAssigneeListAC } from '../../../../utils/task-form-reducer';

function Assignee({ user, i, dispatch }) {
  const assigneeDelete = () => {
    dispatch(deleteFromAssigneeListAC(i));
  };

  return (
    <div className="form_assignee">
      {user}
      <div
        role="button"
        tabIndex={0}
        aria-label="some button"
        onKeyDown={assigneeDelete}
        onClick={assigneeDelete}
        className="close"
      />
    </div>
  );
}

export default Assignee;
