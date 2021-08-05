import fetch from 'cross-fetch';

import {
  POST, PUT, URL, DELETE, HEADERS
} from './constants';

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
  const resp = await fetch(`${URL}/columns/${columnId}/tasks`);
  if (resp.ok) {
    isLoader.current = false;
    const tasks = await resp.json();
    setColumns((oldColumnn) => {
      const newColumn = JSON.parse(JSON.stringify(oldColumnn));
      newColumn[columnIndex].tasks = tasks;
      return newColumn;
    });
  } else fetchColumnTasks(columnId, items);
};

export const createTask = async (columnId, params) => {
  const { title, description, assignee } = params;
  const updated = await fetch(`${URL}/tasks/`, {
    method: POST,
    headers: HEADERS,
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
    headers: HEADERS,
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
    headers: HEADERS,
    body: JSON.stringify({
      title,
      color
    })
  }).then((data) => data.json());
  return updated;
};
