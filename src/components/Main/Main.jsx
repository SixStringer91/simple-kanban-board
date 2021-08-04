import React, {
  useState, useRef, useEffect, useMemo
} from 'react';
import Column from './Column/Column';
import Task from './Column/Task/Task';
import NewColumnForm from './Forms/ColumnCreatorForm';
import { getBoard } from '../../utils/fetchings';

function Main() {
  const dragItem = useRef();
  const dragNode = useRef();
  const [dragging, setDragging] = useState(false);
  const [columns, setColumns] = useState(null);

  useEffect(() => {
    getBoard(setColumns);
  }, []);

  const columnIds = useMemo(() => {
    if (columns) {
      return columns.map((col) => col.id);
    }
    return null;
  }, [columns]);

  const items = {
    setColumns,
    setDragging,
    dragItem,
    dragNode,
    dragging,
    columnIds
  };

  const columnsRender = columns ? columns.map((column, columnIndex) => {
    const tasks = column.tasks.map(
      (task, taskIndex) => (
        <Task
          key={task.id}
          {
          ...{
            items,
            task,
            columnIndex,
            taskIndex
          }}
        />
      )
    ).sort((a, b) => a.order - b.order);
    return (
      <Column
        key={column.id}
        {
        ...{
          items,
          color: column.color,
          columnId: column.id,
          title: column.title,
          taskLength: column.tasks.length,
          columnIndex
        }}
      >
        {tasks}
      </Column>
    );
  }) : 'loading ...';

  return (
    <div className="main">
      <div className="column-wrapper">
        {columnsRender}
        <NewColumnForm items={{ setColumns }} />
      </div>
    </div>
  );
}

export default Main;
