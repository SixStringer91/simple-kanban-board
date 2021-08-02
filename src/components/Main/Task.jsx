function Task(props) {
  const { title, discription, columnIndex, taskIndex, dragItem, dragNode, dragging, setDragging, dragEnterHandler } = props;

  const dragStartHandler = (e, params) => {
    console.log('drag starting ...', params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', dragEndHandler, { once: true });
    setTimeout(() => {
      setDragging(true);
    }, 0);

  }
  const dragEndHandler = (e) => {
    console.log('ending drag');
    dragItem.current = null;
    dragNode.current = null;
    setDragging(false);
  }

  const getStyles = (params) => {
    const currentTask = dragItem.current;
    if (currentTask.columnIndex === params.columnIndex &&
      currentTask.taskIndex === params.taskIndex) {
      return 'current task'
    }
    return 'task'
  }

  return (
    <div
      className={dragging ? getStyles({ columnIndex, taskIndex }) : 'task'}
      draggable={"true"}
      onDragStart={(e) => dragStartHandler(e, { columnIndex, taskIndex })}
      onDragEnter={dragging ? (e) => dragEnterHandler(e, { columnIndex, taskIndex }) : null}
    >
      {/* <div className="task-title">
        {title}
      </div>
      <div className="task-discription">
        {discription}
      </div>
      <div className="task-footer">
        <div className="title-publish_date">
          01.01.2001
        </div>
        <div className="title-assignee">
          вася
        </div>
      </div> */}
      хуй
    </div>
  );
}

export default Task;