import { HTMLAttributes } from 'react';

const TodoHeader = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>할 일 목록</div>;
};

export default TodoHeader;
