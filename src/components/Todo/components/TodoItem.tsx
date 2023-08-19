import { HTMLAttributes } from 'react';
import { Todo } from '../contexts/TodoProvider';
import Toggle from '../../common/Toggle';
import styled from '@emotion/styled';
import { useTodoContext } from '../contexts';

type TodoItemProps = {
  todo: Todo;
} & HTMLAttributes<HTMLDivElement>;

const Text = styled.span<{ complete: boolean }>`
  text-decoration: ${({ complete }) => (complete ? 'line-through' : 'none')};
`;

const TodoItem = ({
  todo: { id, complete, text },
  ...props
}: TodoItemProps) => {
  const { updateTodo, removeTodo } = useTodoContext();

  return (
    <div {...props}>
      <Toggle
        name={id}
        on={complete}
        onChange={() => updateTodo(id, !complete)}
      />
      <Text complete={complete}>{text}</Text>
      <button onClick={() => removeTodo(id)}>remove</button>
    </div>
  );
};

export default TodoItem;
