import { HTMLAttributes } from 'react';
import TodoItem from './TodoItem';
import { useTodoContext } from '../contexts';

const TodoList = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { todos } = useTodoContext();

  return (
    <div {...props}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
