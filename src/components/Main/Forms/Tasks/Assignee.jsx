import React from 'react';

function Assignee({ user, i, addUsers }) {
  const assigneeDelete = () => {
    addUsers((oldList) => {
      const newList = [...oldList];
      newList.splice(i, 1);
      return newList;
    });
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
