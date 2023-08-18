import { useContext } from 'react';
import { TaskContext } from './TaskProvider';

const useTasksContext = () => {
  const context = useContext(TaskContext);
  if (context === null) {
    throw new Error('useTasksContext는 TaskProvider와 같이 쓰여야 합니다.');
  }
  return context;
};

export default useTasksContext;

// Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
// 위 오류 처리

// 상태 관리 라이브러리는 디폴트가 전역상태: 그냥 useStore 쓰면 아무데서나 쓸 수 있다.
// Context API는 상태를 쓸 스코프를 지정해주는 느낌
