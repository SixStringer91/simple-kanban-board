import React, { useState } from 'react';
import { taskSubmitHandler } from '../../../../utils/form-handlers';
import Assignee from './Assignee';

function NewTaskForm(props) {
  const { taskForm } = props;
  const [users, addUsers] = useState([]);

  const usersRender = users.map(
    (user, i) => (
      <Assignee
        key={`${user}${i}`}
        user={user}
        i={i}
        addUsers={addUsers}
      />
    )
  );

  const assigneeHandler = (e) => {
    const input = e.target.previousSibling;
    if (input.value) {
      addUsers((oldUsers) => {
        const newUsers = [...oldUsers];
        const indexCheck = newUsers.indexOf(input.value);
        if (indexCheck === -1) newUsers.push(input.value);
        return newUsers;
      });
    }
  };

  return (
    <form
      onSubmit={(e) => taskSubmitHandler(e, props, users)}
      style={{
        display: `${taskForm ? 'block' : 'none'}`
      }}
      className="task_form"
    >
      <label>
        <input
          autoComplete="off"
          className="task_title"
          placeholder="task title"
          name="title"
          type="text"
        />
      </label>
      <label>
        <textarea
          autoComplete="off"
          className="task_description"
          placeholder="task description"
          name="description"
          type="textarea"
        />
      </label>
      <label>
        <input
          autoComplete="off"
          className="assign_title"
          placeholder="assignee"
          type="text"
          name="assignee"
        />
        <button
          className="btn"
          name="assignee"
          type="button"
          onClick={(e) => assigneeHandler(e)}
        >
          add
        </button>
      </label>
      <div className="users-list">
        {usersRender}
      </div>
      <div className="submit-wrapper">
        <input className="btn" type="submit" value="create task" />
      </div>

    </form>
  );
}

export default NewTaskForm;
