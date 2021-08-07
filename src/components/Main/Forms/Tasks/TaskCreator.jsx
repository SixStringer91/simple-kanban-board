import React, { useReducer } from 'react';
import { taskSubmitHandler } from '../../../../utils/form-handlers';
import {
  initialState,
  reducer,
  setAssigneeAC,
  setTitleAC,
  setDescriptionAC,
  setAssigneeListAC
} from '../../../../reducers/task-form-reducer';
import Assignee from './Assignee';

function NewTaskForm(props) {
  const { taskForm, setTaskForm } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    assigneeList, assignee, title, description
  } = state;

  const usersRender = assigneeList.map(
    (user, i) => (
      <Assignee
        key={`${user}${i}`}
        user={user}
        i={i}
        dispatch={dispatch}
      />
    )
  );

  const preSubmitHandler = (e) => {
    e.preventDefault();
    if (description.length && title.length && assigneeList.length) {
      setTaskForm(false);
      taskSubmitHandler(state, props, dispatch);
    }
  };

  const assigneeHandler = () => {
    const indexCheck = state.assigneeList.indexOf(assignee);
    if (indexCheck === -1
      && assignee.length) dispatch(setAssigneeListAC(assignee));
  };

  return (
    <form
      onSubmit={preSubmitHandler}
      className={taskForm ? 'task_form active' : 'task_form'}
    >
      <label>
        <input
          value={title}
          onChange={(e) => dispatch(setTitleAC(e.target.value))}
          autoComplete="off"
          className="task_title"
          placeholder="task title"
          name="title"
          type="text"
        />
      </label>
      <label>
        <textarea
          value={description}
          onChange={(e) => dispatch(setDescriptionAC(e.target.value))}
          autoComplete="off"
          className="task_description"
          placeholder="task description"
          name="description"
          type="textarea"
        />
      </label>
      <label>
        <input
          value={assignee}
          onChange={(e) => dispatch(setAssigneeAC(e.target.value))}
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
          onClick={assigneeHandler}
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
