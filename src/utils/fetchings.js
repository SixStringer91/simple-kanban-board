import fetch from 'cross-fetch';

export const URL = 'http://localhost:8080';

export const getBoard = async (setColumns) => {
  const columns = await fetch(`${URL}/columns`).then((data) => data.json());
  if (columns.length) {
    columns.forEach(async (column, i) => {
      const tasks = await fetch(`${URL}/columns/${column.id}/tasks`).then(
        (data) => data.json()
      );
      columns[i].tasks = [...tasks];
      if (i === columns.length - 1) {
        setColumns(columns);
      }
    });
  } else setColumns(columns);
};

export const createTask = async (columnId, params) => {
  const { title, description, assignee } = params;
  const updated = await fetch(`${URL}/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      columnId,
      title,
      description,
      assignee
    })
  }).then((data) => data.json());
  return updated;
};

export const updateTask = async (params) => {
  const { id, columnId, taskIndex } = params;
  const updated = await fetch(`${URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      order: taskIndex,
      columnId
    })
  }).then((data) => data.json());
  return updated;
};

export const deleteTask = async (id) => {
  const updated = await fetch(`${URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((data) => data.json());
  return updated;
};

export const createColumn = async (params) => {
  const { title, color } = params;
  const updated = await fetch(`${URL}/columns/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      color
    })
  }).then((data) => data.json());
  return updated;
};
