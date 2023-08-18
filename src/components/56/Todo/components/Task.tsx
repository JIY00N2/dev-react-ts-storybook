import styled from '@emotion/styled';
import Toggle from './Toggle';
import { HTMLAttributes } from 'react';
import useTasksContext from '~/components/56/Todo/contexts/useTasksContext';
import { TaskProps } from '~/components/56/Todo/contexts/TaskProvider';

const ListItem = styled.li`
  display: flex;
  width: 400px;
  height: 40px;
  align-items: center;
  padding: 0 8px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  list-style: none;
  box-sizing: border-box;
`;

// 완료 상태면 취소선 그어주기
const Content = styled.span<{ complete: boolean }>`
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
  text-decoration: ${({ complete }) => (complete ? 'line-through' : 'none')};
`;

const RemoveButton = styled.button`
  width: 60px;
  height: 24px;
  margin-left: 8px;
  color: white;
  border-radius: 8px;
  border: none;
  background-color: red;
  font-size: 5px;
  cursor: pointer;
`;

export type TaskRequiredProps = TaskProps & HTMLAttributes<HTMLLIElement>;

// content: 어떤 task인지, complete: 완료 여부
// remove 버튼을 누르거나 toggle이 변경되었을때, 업데이트를 해줘야 한다.
// consumer를 통해 updateTask와 removeTask를 받아옴
// 토글에서 onChange 이벤트가 발생하면 updateTask를 통해 id와 true/false 여부를 넘김
// 삭제 버튼에서 onClick 이벤트가 발생하면 removeTask를 바인딩
const Task = ({ id, content, complete, ...props }: TaskRequiredProps) => {
  const { updateTask, removeTask } = useTasksContext();
  return (
    <ListItem {...props}>
      <Toggle on={complete} onChange={() => updateTask(id, !complete)} />
      <Content complete={complete}>{content}</Content>
      <RemoveButton onClick={() => removeTask(id)}>Remove</RemoveButton>
    </ListItem>
  );
};

export default Task;
