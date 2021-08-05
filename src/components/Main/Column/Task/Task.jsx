import React from 'react';
import { timeHandler } from '../../../../utils/time-handler';
import {
  dragEnterHandler, dragStartHandler, deleteTaskHandler
} from '../../../../utils/drag-n-drop';

function Task(props) {
  const {
    items, state, task, columnIndex, taskIndex, isLoader
  } = props;
  const {
    title, id, description, publishDate, assignee
  } = task;
  const {
    descriptionView, assigneeView, dateView
  } = state;
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

  const assigneeRender = assignee.map(
    (user) => (
      <div
        key={user}
        className="assignee_render"
      >
        <span>{user[0]}</span>
      </div>
    )
  );

  return (
    <div
      data-id={id}
      className={
        items.dragging ? getStyles({ columnIndex, taskIndex }) : 'task'
      }
      draggable
      onDragLeave={() => {
        isLoader.current = false;
      }}
      onDragStart={
        (e) => dragStartHandler(
          e, { columnIndex, taskIndex }, { ...items, isLoader }
        )
      }
      onDragEnter={
        items.dragging
          ? (e) => dragEnterHandler(
            e, { columnIndex, taskIndex }, { ...items, isLoader }
          )
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
      <div className="task-discription">{descriptionView && description}</div>
      <div className="task-footer">
        <div className="title-publish_date">
          {dateView && timeHandler(publishDate)}
        </div>
        <div className="title-assignee">{assigneeView && assigneeRender}</div>
      </div>
    </div>
  );
}

export default Task;
