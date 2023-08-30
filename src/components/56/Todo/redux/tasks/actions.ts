// action에는 addTask, updateTask, removeTask등이 필요하다.

import { v4 } from 'uuid';
import { Action } from './types';

export const addTask = (content: string): Action => {
  return {
    type: 'ADD_TASK',
    payload: {
      id: v4(),
      content,
      complete: false,
    },
  };
};

export const updateTask = (
  id: string,
  content: string,
  complete: boolean
): Action => {
  return {
    type: 'UPDATE_TASK',
    payload: {
      id,
      content,
      complete,
    },
  };
};

export const removeTask = (id: string): Action => {
  return {
    type: 'REMOVE_TASK',
    payload: {
      id,
      content: '',
      complete: false,
    },
  };
};
