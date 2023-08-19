import { TodoForm, TodoHeader, TodoList } from './components';
import { TodoProvider } from './contexts';

const Todo = () => {
  return (
    <TodoProvider>
      <TodoHeader />
      <TodoForm />
      <TodoList />
    </TodoProvider>
  );
};

export default Todo;
