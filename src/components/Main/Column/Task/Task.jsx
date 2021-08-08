import React from 'react';
import { timeHandler } from '../../../../utils/time-handler';
import {
  dragEnterHandler, dragStartHandler, deleteTaskHandler
} from '../../../../utils/drag-n-drop';

function Task(props) {
  const {
    items, settings, task, columnIndex, taskIndex, isLoader, dispatch
  } = props;
  const {
    title, id, description, publishDate, assignee
  } = task;
  const {
    descriptionView, assigneeView, dateView
  } = settings;

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
      draggable={!isLoader}
      onDragStart={
        (e) => !isLoader && dragStartHandler(
          e, { columnIndex, taskIndex }, { ...items, dispatch, task }
        )
      }
      onDragEnter={
        items.dragging
          ? (e) => dragEnterHandler(
            e, { columnIndex, taskIndex }, { ...items, dispatch }
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
            () => !isLoader
            && deleteTaskHandler({ id, taskIndex }, { ...items, dispatch })
          }
          onKeyDown={
            () => !isLoader
            && deleteTaskHandler({ id, taskIndex }, { ...items, dispatch })
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
