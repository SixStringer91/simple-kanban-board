import React from 'react';
import { taskSubmitHandler } from '../../utils/form-handlers';

function NewTaskForm(props) {
  const { taskForm } = props;

  return (
    <form
      onSubmit={(e) => taskSubmitHandler(e, props)}
      style={{
        display: `${taskForm ? 'block' : 'none'}`
      }}
      className="task_form"
    >
      <label htmlFor="title">
        <input
          className="task_title"
          placeholder="task title"
          id="title"
          type="text"
        />
      </label>
      <label htmlFor="assignee">
        <input
          className="assign_title"
          placeholder="assignee"
          id="assignee"
          type="text"
        />
      </label>
      <label htmlFor="description">
        <textarea
          className="task_description"
          placeholder="task description"
          id="description"
          type="textarea"
        />
      </label>
      <input type="submit" value="create task" />
    </form>
  );
}

export default NewTaskForm;
