import { createContext, useState } from 'react';
import { v4 } from 'uuid';

export type Todo = {
  id: string;
  complete: boolean;
  text: string;
};
export type Todos = Todo[];

type TodoContextValue = {
  todos: Todos;
  addTodo: (text: string) => void;
  updateTodo: (id: string, complete: boolean) => void;
  removeTodo: (id: string) => void;
};

export const TodoContext = createContext<TodoContextValue | null>(null);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todos>([]);

  const addTodo = (text: string) => {
    setTodos((todos) => [...todos, { id: v4(), complete: false, text }]);
  };

  const updateTodo = (id: string, complete: boolean) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, complete } : todo))
    );
  };

  const removeTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
