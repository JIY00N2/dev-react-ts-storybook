import { createContext } from 'react';
import { v4 } from 'uuid';
import todoLocalStorage from '~/hooks/todoLocalStorage';

export type TaskProps = {
  id: string;
  content: string;
  complete: boolean;
};

export type Tasks = TaskProps[];

type TaskContextType = {
  tasks: Tasks;
  addTask: (content: string) => void;
  updateTask: (id: string, status: boolean) => void;
  removeTask: (id: string) => void;
};

export const TaskContext = createContext<TaskContextType | null>(null);
// Provider 컴포넌트에 상태 추가
// value안의 값들이 consumer 들이 받는 값
const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  // 로컬스토리지에서 key 값 정의
  const [tasks, setTasks] = todoLocalStorage('tasks', []);
  // 추가 함수
  const addTask = (content: string) => {
    setTasks([...tasks, { id: v4(), content, complete: false }]);
  };
  // 완료 변경 함수
  // 어떤 Task인지 찾기 위해 id를 받고, 완료 여부를 받는다.
  // 리스트에서 값을 업데이트 할 떄는 map을 이용한다.
  // tasks의 리스트의 id와 매개변수로 받아온 id 값이 같다면 새롭게 값 업데이트
  const updateTask = (id: string, status: boolean) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, complete: status } : item
      )
    );
  };
  // Task 삭제 함수
  const removeTask = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
