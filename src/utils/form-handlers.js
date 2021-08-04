import { createTask, createColumn } from './fetchings';
import { resetFormAC } from './column-form-reducer';

export const taskSubmitHandler = async (e, columnParams, users) => {
  e.preventDefault();
  const { columnId, columnIndex, setColumns } = columnParams;
  const { description, title } = e.target.elements;
  const params = {
    description: description.value,
    title: title.value,
    assignee: users
  };
  const updatedTasks = await createTask(columnId, params);
  description.value = '';
  title.value = '';
  setColumns((oldBoard) => {
    const newColumn = JSON.parse(JSON.stringify(oldBoard));
    newColumn[columnIndex].tasks = [...updatedTasks];
    return newColumn;
  });
};

export const columnSubmitHandler = async (params, items) => {
  const {
    e, color, title, dispatch
  } = params;
  e.preventDefault();
  const { setColumns } = items;
  const newColumn = await createColumn({ color, title });
  if (newColumn) {
    dispatch(resetFormAC());
    setColumns((oldBoard) => {
      const newColumns = JSON.parse(JSON.stringify(oldBoard));
      newColumns.push(newColumn);
      return newColumns;
    });
  }
};
