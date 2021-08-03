import { createTask } from './fetchings';

export const taskSubmitHandler = async (e, columnParams) => {
  e.preventDefault();
  const { columnId, columnIndex, setColumns } = columnParams;
  const { description, title, assignee } = e.target.elements;
  const params = {
    description: description.value,
    title: title.value,
    assignee: assignee.value
  };
  const updatedTasks = await createTask(columnId, params);
  description.value = '';
  title.value = '';
  assignee.value = '';
  setColumns((oldBoard) => {
    const newColumn = JSON.parse(JSON.stringify(oldBoard));
    newColumn[columnIndex].tasks = [...updatedTasks];
    return newColumn;
  });
};
