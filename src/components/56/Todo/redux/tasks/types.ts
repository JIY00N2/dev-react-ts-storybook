export interface Task {
  id: string;
  content: string;
  complete: boolean;
}

export type ActionType = 'ADD_TASK' | 'UPDATE_TASK' | 'REMOVE_TASK';

// payload는 실제로 들어가는 값을 의미
// 여기서는 Task를 넣어줬지만 reducer에 따라 다른 값을 넣어줘도댐
export type Action = { type: ActionType; payload: Task };
