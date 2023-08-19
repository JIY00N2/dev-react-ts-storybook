import { useContext } from 'react';
import { TodoContext } from './TodoProvider';

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error('useTodoContext는 TodoProvider와 같이 쓰여야 합니다.');
  }
  return context;
};
