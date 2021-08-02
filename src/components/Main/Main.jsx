import { useState, useRef, useEffect } from 'react';
import Column from './Column';
import Task from './Task';

const URL = 'http://localhost:8080';

function Main() {
  const dragItem = useRef();
  const dragNode = useRef();
  const [dragging, setDragging] = useState(false);
  const [boards, setBoards] = useState(null);

  const dragEndHandler = (callback) => {
    dropHandler({...dragItem.current}, dragNode.current.dataset.id, callback);
    console.log('drag End')
    dragItem.current = null;
    dragNode.current = null;
    setDragging(false);
  };

  const dragEnterHandler = (e, params) => {
    const currentTask = dragItem.current;
    if (e.target !== dragNode.current) {
      setBoards(oldColumnn => {
        const newColumn = JSON.parse(JSON.stringify(oldColumnn));
        newColumn[params.columnIndex]
          .tasks
          .splice(params.taskIndex, 0, newColumn[currentTask.columnIndex]
            .tasks.splice(currentTask.taskIndex, 1)[0]);
        dragItem.current = params;
        return newColumn;
      })
    }
  };

  const dragStartHandler = (e, params) => {
    console.log('drag starting ...', params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', dragEndHandler,{ once:true });
    setTimeout(() => {
      setDragging(true);
    }, 0);
  }

  const dropHandler = async (data, id, callback) => {
    const { columnIndex, taskIndex } = data;
    const columnId = boards[columnIndex].id;
    await fetch(`${URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: taskIndex,
        columnId
      })
    });
  }

  const fetchBoard = async () => {
    const columns = await fetch(`${URL}/columns`).then(data => data.json());
    columns.forEach(async (column, i) => {
      const tasks = await fetch(`${URL}/columns/${column.id}/tasks`)
        .then(data => data.json());
      columns[i].tasks = [...tasks];
      if (i === columns.length - 1) setBoards(columns);
    })
  }

  useEffect(() => {
    fetchBoard();
  }
    , [])

  const columns = boards ? boards.map((board, columnIndex) => {
    const tasks = board.tasks.map(
      (task, taskIndex) => <Task key={task.id} {
        ...{
          ...task,
          columnIndex,
          taskIndex,
          dragItem,
          dragging,
          dragStartHandler,
          dragEndHandler,
          dragEnterHandler
        }} />
    ).sort((a, b) => a.order - b.order);
    return <Column key={board.id} {
      ...{
        title: board.title,
        dragEnterHandler,
        taskLength: board.tasks.length,
        columnIndex,
        dragging
      }}>
      {tasks}
    </Column>
  }) : 'loading ...'

  return (
    <div className='main'>
      <div className="column-wrapper">
        {columns}
      </div>
    </div>
  );
}

export default Main;