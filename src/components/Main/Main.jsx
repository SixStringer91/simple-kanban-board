import { useState, useRef } from 'react';
import Column from './Column';
import Task from './Task';

function Main() {
  const dragItem = useRef();
  const dragNode = useRef();
  const [dragging, setDragging] = useState(false);
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'In Progress',
      tasks: [
        {
          id: 1,
          title: 'пойти в магаз',
          discription: 'пойду короче я в магаз',
        },
        {
          id: 1,
          title: 'пойти в магаз',
          discription: 'пойду короче я в магаз',
        },
      ],
    },
    {
      id: 2,
      title: 'In Degress',
      tasks: [
        {
          id: 1,
          title: 'пойти в магаз',
          discription: 'пойду короче я в магаз',
        },
        {
          id: 1,
          title: 'пойти в магаз',
          discription: 'пойду короче я в магаз',
        },
      ],
    },
    {
      id: 3,
      title: 'In Utero',
      tasks: [
        {
          id: 1,
          title: 'пойти в магаз',
          discription: 'пойду короче я в магаз',
        },
        {
          id: 1,
          title: 'пойти в магаз',
          discription: 'пойду короче я в магаз',
        },
      ],
    },
  ]);

  const dragEnterHandler = (e, params) => {
    console.log('entering drag ', params);
    const currentTask = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log('target is not the same');
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
  }

  const columns = boards.map((board, columnIndex) => {
    const tasks = board.tasks.map(
      (task, taskIndex) => <Task key={taskIndex} {...{ ...task, columnIndex, taskIndex, dragItem, dragNode, dragging, setDragging, setBoards, dragEnterHandler }} />
    )
    return <Column key={columnIndex} {...{ title: board.title, dragEnterHandler, taskLength: board.tasks.length, columnIndex, dragging }}>
      {tasks}
    </Column>
  })

  return (
    <div className='main'>
      <div className="column-wrapper">
        {columns}
      </div>
    </div>
  );
}

export default Main;