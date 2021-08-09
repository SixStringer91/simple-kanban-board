import React, {
  useEffect, useReducer
} from 'react';
import { dragEnterHandler } from '../../../utils/drag-n-drop';
import NewTaskForm from '../Forms/Tasks/TaskCreator';
import { hexToRGB } from '../../../utils/color-handler';
import Task from './Task/Task';
import { fetchColumnTasks } from '../../../utils/fetchings';
import loader from '../../../assets/loader.svg';
import {
  reducer, initialState, setTaskFormAC
} from '../../../reducers/column-reducer';

function Column(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    items,
    columnId,
    color,
    columnIndex,
    title,
    settings
  } = props;
  const {
    tasks, isLoader, taskForm
  } = state;

  useEffect(() => {
    fetchColumnTasks(columnId, dispatch);
  }, []);

  const tasksRender = tasks.map(
    (task, taskIndex) => (
      <Task
        key={`${task.id}`}
        {
        ...{
          items,
          task,
          settings,
          columnIndex,
          taskIndex,
          isLoader,
          dispatch
        }}
      />
    )
  ).sort((a, b) => a.order - b.order);
  return (
    <div
      className="column"
      style={
        {
          backgroundColor: hexToRGB(color, 0.7)
        }
      }
      onDragEnter={
        items.dragging && !tasks.length
          ? (e) => {
            if (!isLoader) {
              dragEnterHandler(
                e, { columnIndex, taskIndex: 0 },
                { ...items, dispatch }
              );
            }
          }
          : null
      }
    >
      <div className="column-header">
        <div className="column-title">{title}</div>
        {
          isLoader
          && <img className="task_loader" alt="loader" src={loader} />
        }
        <button
          type="button"
          onClick={() => dispatch(setTaskFormAC(!taskForm))}
          className={`${taskForm ? 'add active' : 'add'}`}
          aria-label="some button"
        />
      </div>
      <NewTaskForm
        taskDispatch={dispatch}
        setColumns={items.setColumns}
        columnIndex={columnIndex}
        columnId={columnId}
        taskForm={taskForm}
      />
      <div className="task-wrapper">
        {tasksRender}
      </div>
    </div>
  );
}

export default Column;
