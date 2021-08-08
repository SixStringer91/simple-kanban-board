import { createTask, createColumn } from './fetchings';
import { resetColumnFormAC } from '../reducers/column-form-reducer';
import { resetTaskFormAC } from '../reducers/task-form-reducer';
import { setAllTasksAC } from '../reducers/column-reducer';

export const taskSubmitHandler = async (state, columnParams, dispatch) => {
  const {
    columnId, taskDispatch
  } = columnParams;
  const { description, title, assigneeList } = state;
  const params = {
    description,
    title,
    assignee: assigneeList
  };
  const updatedTasks = await createTask(columnId, params);
  dispatch(resetTaskFormAC());
  taskDispatch(setAllTasksAC(updatedTasks));
};

export const columnSubmitHandler = async (params, items) => {
  const {
    e, color, title, dispatch
  } = params;
  e.preventDefault();
  const { setColumns } = items;
  const newColumn = await createColumn({ color, title });
  if (newColumn) {
    dispatch(resetColumnFormAC());
    setColumns((oldBoard) => {
      const newColumns = JSON.parse(JSON.stringify(oldBoard));
      newColumns.push(newColumn);
      return newColumns;
    });
  }
};
