import fetch from 'cross-fetch';
// https://immense-plains-02487.herokuapp.com
export const URL = 'https://immense-plains-02487.herokuapp.com';

const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

const headers = {
  'Content-Type': 'application/json'
};

export const getBoard = async (setColumns) => {
  const resp = await fetch(`${URL}/columns`);
  if (resp.ok) {
    const columns = await resp.json();
    setColumns(columns);
  } else getBoard(setColumns);
};

export const fetchColumnTasks = async (columnId, items) => {
  const {
    setColumns, columnIndex, isLoader
  } = items;
  const tasks = await fetch(`${URL}/columns/${columnId}/tasks`).then(
    (data) => data.json()
  );
  isLoader.current = false;
  if (tasks.length) {
    setColumns((oldColumnn) => {
      const newColumn = JSON.parse(JSON.stringify(oldColumnn));
      newColumn[columnIndex].tasks = tasks;
      return newColumn;
    });
  }
};

export const createTask = async (columnId, params) => {
  const { title, description, assignee } = params;
  const updated = await fetch(`${URL}/tasks/`, {
    method: POST,
    headers,
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
    method: PUT,
    headers,
    body: JSON.stringify({
      order: taskIndex,
      columnId
    })
  }).then((data) => data.json());
  return updated;
};

export const deleteTask = async (id) => {
  const updated = await fetch(`${URL}/tasks/${id}`, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((data) => data.json());
  return updated;
};

export const createColumn = async (params) => {
  const { title, color } = params;
  const updated = await fetch(`${URL}/columns/`, {
    method: POST,
    headers,
    body: JSON.stringify({
      title,
      color
    })
  }).then((data) => data.json());
  return updated;
};
