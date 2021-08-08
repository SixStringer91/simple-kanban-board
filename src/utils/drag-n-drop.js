import { deleteTask, updateTask } from './fetchings';
import {
  setAllTasksAC,
  setLoaderAC,
  setTaskInSameColumnAC,
  deleteTaskAC,
  addTaskAC
} from '../reducers/column-reducer';

export const dragEnterHandler = (e, params, items) => {
  const {
    dragItem, dragParams, dragNode, dispatch, columnIds, dragDispatch
  } = items;
  if (e.target !== dragNode.current) {
    if (dragParams.current.columnId === columnIds[params.columnIndex]) {
      dispatch(
        setTaskInSameColumnAC({
          taskIndex: params.taskIndex,
          dragIndex: dragItem.current.taskIndex
        })
      );
    } else {
      dragParams.current.columnId = columnIds[params.columnIndex];
      dragDispatch.current(
        deleteTaskAC({
          taskIndex: dragItem.taskIndex
        })
      );
      dragDispatch.current = dispatch;
      dragDispatch.current(
        addTaskAC({
          taskIndex: params.taskIndex,
          dragParams: dragParams.current
        })
      );
    }
    dragItem.current = params;
  }
};

export const dragEndHandler = async (items) => {
  const {
    dragItem,
    dragNode,
    columnIds,
    setDragging,
    dragDispatch,
    dragParams
  } = items;
  const params = dragItem.current;
  const { columnIndex, taskIndex } = params;
  const { id } = dragNode.current.dataset;
  const columnId = columnIds[columnIndex];
  const updatedTasks = await updateTask({ id, columnId, taskIndex });
  dragDispatch.current(setAllTasksAC(updatedTasks));
  dragItem.current = null;
  dragNode.current = null;
  dragDispatch.current = null;
  dragParams.current = null;
  setDragging(false);
};

export const dragStartHandler = (e, params, items) => {
  const target = e.target.closest('.task');
  const {
    dragItem,
    dragNode,
    setDragging,
    dragParams,
    dragDispatch,
    dispatch,
    task
  } = items;
  dragItem.current = params;
  dragNode.current = target;
  dragParams.current = task;
  dragDispatch.current = dispatch;
  dragDispatch.current(setLoaderAC(true));
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
  const { id, taskIndex } = params;
  const { dispatch } = items;
  console.log(taskIndex);
  dispatch(deleteTaskAC(taskIndex));
  const updated = await deleteTask(id);
  dispatch(setAllTasksAC(updated));
};
