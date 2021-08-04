import React, { useState, useEffect, useRef } from 'react';
import { dragEnterHandler } from '../../../utils/drag-n-drop';
import NewTaskForm from '../Forms/Tasks/TaskCreator';
import { hexToRGB } from '../../../utils/color-handler';
import Task from './Task/Task';
import { fetchColumnTasks } from '../../../utils/fetchings';
import loader from '../../../assets/loader.svg';

function Column(props) {
  const {
    items,
    columnId,
    color,
    columnIndex,
    title,
    tasks,
    state
  } = props;
  const [taskForm, setTaskForm] = useState(false);

  const isLoader = useRef(true);

  useEffect(() => {
    fetchColumnTasks(columnId, { ...items, columnIndex, isLoader });
  }, []);

  const tasksRender = tasks.map(
    (task, taskIndex) => (
      <Task
        key={task.id}
        {
        ...{
          items,
          task,
          state,
          columnIndex,
          taskIndex
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
          ? (e) => dragEnterHandler(e, { columnIndex, taskIndex: 0 }, items)
          : null
      }
    >
      <div className="column-header">
        <div className="column-title">{title}</div>
        <button
          type="button"
          onClick={() => setTaskForm((prev) => !prev)}
          className={`${taskForm ? 'add active' : 'add'}`}
          aria-label="some button"
        />
      </div>
      <NewTaskForm
        setColumns={items.setColumns}
        columnIndex={columnIndex}
        columnId={columnId}
        taskForm={taskForm}
      />
      <div className="task-wrapper">
        {isLoader.current
          ? <img className="task_loader" alt="loader" src={loader} />
          : tasksRender}
      </div>
    </div>
  );
}

export default Column;
