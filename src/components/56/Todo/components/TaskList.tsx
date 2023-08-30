// Task 관련된 데이터를 받아서(contextapi를 통해) map으로 뿌려줌
import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import Task from './Task';
import { useSelector } from 'react-redux';
import { RootStore } from '../redux';
// import useTasksContext from '~/components/56/Todo/contexts/useTasksContext';

const UnorderedList = styled.ul`
  width: 400px;
  margin: 0;
  padding: 0;

  & > li {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`;

// useTasks에서 tasks 목록들을 받아온다.
// map을 이용해서 뿌려주자
// list 사용시 항상 key 사용!, id도 같이 넘겨야 한다.
// 왜냐하면 task가 id를 알아야 함수를 호출 시킬 수 있다.
const TaskList = ({ ...props }: HTMLAttributes<HTMLUListElement>) => {
  // const { tasks } = useTasksContext();

  // 값을 보여주기 위해서는 selector 사용
  // 정의한 reducer이름을 넣어줌
  const tasks = useSelector((store: RootStore) => store.tasks);

  return (
    <UnorderedList {...props}>
      {tasks.map((item) => (
        <Task
          key={item.id}
          id={item.id}
          content={item.content}
          complete={item.complete}
        />
      ))}
    </UnorderedList>
  );
};
export default TaskList;
