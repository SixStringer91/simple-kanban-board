import { deleteTask, updateTask } from './fetchings';
import {
  setAllTasksAC,
  setLoaderAC,
  deleteTaskAC,
  addTaskAC
} from '../reducers/column-reducer';

export const dragEnterHandler = async (e, params, items) => {
  const {
    dragIndex, dragContent, dragNode, dispatch, columnIds, dragDispatch
  } = items;
  const target = e.target.closest('.task');
  const isColumnHasTask = target
    ? (e.clientY >= target.offsetTop + (target.offsetHeight / 2))
    : true;
  if (target !== dragNode.current
    && isColumnHasTask) {
    if (dragContent.current.columnId !== columnIds[params.columnIndex]) {
      dragDispatch.current(
        deleteTaskAC({
          taskIndex: dragIndex.current.taskIndex
        })
      );
    }
    dragDispatch.current = dispatch;
    dragContent.current.columnId = columnIds[params.columnIndex];
    dragDispatch.current(
      addTaskAC({
        taskIndex: params.taskIndex,
        dragContent: dragContent.current
      })
    );
    dragIndex.current = params;
  }
};

export const dragEndHandler = async (items) => {
  const {
    dragIndex,
    dragNode,
    columnIds,
    setIsDragging,
    dragDispatch,
    dragContent
  } = items;
  const params = dragIndex.current;
  const { columnIndex, taskIndex } = params;
  const { id } = dragNode.current.dataset;
  const columnId = columnIds[columnIndex];
  const updatedTasks = await updateTask({ id, columnId, taskIndex });
  dragDispatch.current(setAllTasksAC(updatedTasks));
  dragIndex.current = null;
  dragNode.current = null;
  dragDispatch.current = null;
  dragContent.current = null;
  setIsDragging(false);
};

export const dragStartHandler = (e, params, items) => {
  const target = e.target.closest('.task');
  const {
    dragIndex,
    dragNode,
    setIsDragging,
    dragContent,
    dragDispatch,
    dispatch,
    task
  } = items;
  dragIndex.current = params;
  dragNode.current = target;
  dragContent.current = task;
  dragDispatch.current = dispatch;
  dragDispatch.current(setLoaderAC(true));
  dragNode.current.addEventListener(
    'dragend',
    () => dragEndHandler({ ...params, ...items }),
    { once: true }
  );
  setTimeout(() => {
    setIsDragging(true);
  }, 0);
};

export const deleteTaskHandler = async (params, items) => {
  const { id, taskIndex } = params;
  const { dispatch } = items;
  dispatch(deleteTaskAC({ taskIndex }));
  const updated = await deleteTask(id);
  dispatch(setAllTasksAC(updated));
};
