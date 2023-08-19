import { FormEvent, HTMLAttributes, useRef } from 'react';
import { useTodoContext } from '../contexts';

const TodoForm = ({ ...props }: HTMLAttributes<HTMLFormElement>) => {
  const { addTodo } = useTodoContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      addTodo(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <form {...props} onSubmit={handleSumbit}>
      <input ref={inputRef} type="text" />
      <button>추가</button>
    </form>
  );
};

export default TodoForm;
