import React from 'react';
import { timeHandler } from '../../../../utils/time-handler';
import {
  dragEnterHandler, dragStartHandler, deleteTaskHandler
} from '../../../../utils/drag-n-drop';

function Task(props) {
  const {
    items, task, columnIndex, taskIndex
  } = props;
  const {
    title, id, description, publishDate, assignee
  } = task;
  const getStyles = (params) => {
    const currentTask = items.dragItem.current;
    if (
      currentTask.columnIndex === params.columnIndex
      && currentTask.taskIndex === params.taskIndex
    ) {
      return 'current task';
    }
    return 'task';
  };
  return (
    <div
      data-id={id}
      className={
        items.dragging ? getStyles({ columnIndex, taskIndex }) : 'task'
      }
      draggable
      onDragStart={
        (e) => dragStartHandler(e, { columnIndex, taskIndex }, items)
      }
      onDragEnter={
        items.dragging
          ? (e) => dragEnterHandler(e, { columnIndex, taskIndex }, items)
          : null
      }
    >
      <div className="task-title">
        <span>{title}</span>
        <span
          role="button"
          tabIndex={0}
          aria-label="some button"
          onClick={
            () => deleteTaskHandler({ id, columnIndex }, items)
          }
          onKeyDown={
            () => deleteTaskHandler({ id, columnIndex }, items)
          }
          className="close"
        />
      </div>
      <div className="task-discription">{description}</div>
      <div className="task-footer">
        <div className="title-publish_date">{timeHandler(publishDate)}</div>
        <div className="title-assignee">{assignee}</div>
      </div>
    </div>
  );
}

export default Task;
