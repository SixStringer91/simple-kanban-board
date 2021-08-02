import { timeHandler } from "../../utils/time-hanadler";

function Task(props) {
  const { title, id, discription, publishDate, columnIndex, taskIndex, dragItem, dragStartHandler, dragging, dragEnterHandler } = props;
  const getStyles = (params) => {
    const currentTask = dragItem.current;
    if (currentTask.columnIndex === params.columnIndex &&
      currentTask.taskIndex === params.taskIndex) {
      return 'current task'
    }
    return 'task'
  };

  return (
    <div
      data-id={id}
      className={dragging ? getStyles({ columnIndex, taskIndex }) : 'task'}
      draggable={"true"}
      onDragStart={(e) => dragStartHandler(e, { columnIndex, taskIndex })}
      onDragEnter={dragging ? (e) => dragEnterHandler(e, { columnIndex, taskIndex }) : null}
    >
          <div className="task-title">
            {title}
          </div>
          <div className="task-discription">
            {discription}
          </div>
          <div className="task-footer">
            <div className="title-publish_date">
              {timeHandler(publishDate)}
            </div>
            <div className="title-assignee">
              вася
            </div>
          </div>
    </div>
  );
}

export default Task;