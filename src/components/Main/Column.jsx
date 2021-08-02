function Column(props) {
  const { dragging, taskLength, columnIndex, dragEnterHandler } = props;

  return (
    <div 
    className="column"
    onDragEnter={dragging && !taskLength ? (e) => dragEnterHandler (e, {columnIndex, taskIndex: 0}): null}
    >
      <div className="column-header">
        <div className="colimn-title">
          In Progress
        </div>
        <button className="column-add-button">
          +
        </button>
      </div>
      <div className="task-wrapper">
      {props.children}
      </div>
    </div>
  );
}

export default Column;