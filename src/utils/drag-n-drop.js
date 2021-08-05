import { deleteTask, updateTask } from './fetchings';

export const dragEnterHandler = (e, params, items) => {
  const {
    dragItem, dragNode, setColumns, isLoader
  } = items;
  const currentTask = dragItem.current;
  isLoader.current = true;
  if (e.target !== dragNode.current) {
    setColumns((oldColumnn) => {
      const newColumn = JSON.parse(JSON.stringify(oldColumnn));
      newColumn[params.columnIndex].tasks.splice(
        params.taskIndex,
        0,
        newColumn[currentTask.columnIndex].tasks.splice(
          currentTask.taskIndex,
          1
        )[0]
      );
      dragItem.current = params;
      return newColumn;
    });
  }
};

export const dragEndHandler = async (items) => {
  const {
    dragItem, dragNode, setDragging, setColumns, columnIds, isLoader
  } = items;
  const params = dragItem.current;
  const { columnIndex, taskIndex } = params;
  const { id } = dragNode.current.dataset;
  const columnId = columnIds[columnIndex];
  const updatedTasks = await updateTask({ id, columnId, taskIndex });
  isLoader.current = false;
  setColumns((oldColumnn) => {
    const newColumn = JSON.parse(JSON.stringify(oldColumnn));
    newColumn[params.columnIndex].tasks = updatedTasks;
    return newColumn;
  });
  dragItem.current = null;
  dragNode.current = null;
  setDragging(false);
};

export const dragStartHandler = (e, params, items) => {
  const { dragItem, dragNode, setDragging } = items;
  dragItem.current = params;
  dragNode.current = e.target;
  dragNode.current.addEventListener(
    'dragend',
    () => dragEndHandler({ ...params, ...items }),
    { once: true }
  );
  setTimeout(() => {
    setDragging(true);
  }, 0);
};

export const deleteTaskHandler = async (params, items) => {
  const { id, columnIndex } = params;
  const { setColumns } = items;
  const updated = await deleteTask(id);
  setColumns((oldColumnn) => {
    const newColumn = JSON.parse(JSON.stringify(oldColumnn));
    newColumn[columnIndex].tasks = updated;
    return newColumn;
  });
};
