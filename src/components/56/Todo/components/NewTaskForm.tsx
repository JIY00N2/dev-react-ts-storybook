// input을 통해 입력받은 task를 추가하는 역할

import styled from '@emotion/styled';
import { FormEvent, HTMLAttributes, useState } from 'react';
import useTasksContext from '~/components/56/Todo/contexts/useTasksContext';

const Form = styled.form`
  width: 400px;
`;

const Input = styled.input`
  width: 332px;
  height: 32px;
  padding: 4px 6px;
  border-radius: 8px;
  border: 2px solid black;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 60px;
  height: 32px;
  padding: 4px 6px;
  margin-left: 8px;
  color: white;
  border-radius: 8px;
  border: none;
  background-color: black;
  box-sizing: border-box;
  cursor: pointer;
`;

// addTask 함수 추가
const NewTaskForm = ({ ...props }: HTMLAttributes<HTMLFormElement>) => {
  // input에 대한 상태
  const [task, setTask] = useState('');
  const { addTask } = useTasksContext();

  // submit을 할 때, 페이지 이동이 되지 않도록 preventDefault
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // addTask를 통해 task 추가
    addTask(task);
    // 값 입력 후 input 비우기
    setTask('');
  };
  return (
    <Form {...props} onSubmit={handleSubmit}>
      <Input
        type='text'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <SubmitButton>Add</SubmitButton>
    </Form>
  );
};

export default NewTaskForm;
