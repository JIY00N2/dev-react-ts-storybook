// 상태를 변화시키는 로직인데 순수함수
import { Action, Task } from './types';

// state: 기존 상태, action: 변화를 위한 액션
// state가 undefined일 수도 있기 때문에 기본값주기
export const tasks = (state: Task[] = [], action: Action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask = action.payload;
      return [...state, newTask];
    }
    case 'UPDATE_TASK': {
      const updateTask = action.payload;
      return state.map((oldTask) =>
        oldTask.id === updateTask.id ? updateTask : oldTask
      );
    }
    case 'REMOVE_TASK': {
      const removeTask = action.payload;
      return state.filter((task) => task.id !== removeTask.id);
    }
    default: {
      return state;
    }
  }
};
