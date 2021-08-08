import fetch from 'cross-fetch';
import { setAllTasksAC } from '../reducers/column-reducer';

import {
  POST, PUT, URL, DELETE, HEADERS
} from './constants';

export const getBoard = async (setColumns) => {
  const resp = await fetch(`${URL}/columns`).catch((err) => err);
  if (resp.ok) {
    const columns = await resp.json();
    setColumns(columns);
  } else {
    setTimeout(() => {
      getBoard(setColumns);
    }, 5000);
  }
};

export const fetchColumnTasks = async (columnId, dispatch) => {
  const resp = await fetch(`${URL}/columns/${columnId}/tasks`)
    .catch((err) => err);
  if (resp.ok) {
    const tasks = await resp.json();
    dispatch(setAllTasksAC(tasks));
  } else {
    setTimeout(() => {
      fetchColumnTasks(columnId, dispatch);
    }, 10000);
  }
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
