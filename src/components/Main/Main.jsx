import React, {
  useState, useRef, useEffect, useMemo
} from 'react';
import Column from './Column/Column';
import NewColumnForm from './Forms/Columns/ColumnCreator';
import { getBoard } from '../../utils/fetchings';
import loader from '../../assets/loader.svg';

function Main({ settings }) {
  const dragIndex = useRef(null);
  const dragNode = useRef(null);
  const dragDispatch = useRef(null);
  const dragContent = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
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
    setIsDragging,
    isDragging,
    dragIndex,
    dragNode,
    dragDispatch,
    dragContent,
    columnIds
  };

  const columnsRender = columns && columns.map(({
    color, tasks, id, title
  }, columnIndex) => (
    <Column
      key={id}
      {
      ...{
        color,
        tasks,
        columnId: id,
        title,
        columnIndex,
        settings,
        items
      }}
    />
  ));

  return (
    <div className="main">
      <div className="column-wrapper">
        {columns
          ? (
            <>
              {columnsRender}
              <NewColumnForm items={{ setColumns }} />
            </>
          )
          : <img className="main-loader" alt="loader" src={loader} />}
      </div>
    </div>
  );
}

export default Main;
