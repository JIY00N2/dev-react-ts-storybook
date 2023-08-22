import { useState } from 'react';
import { Tasks } from '~/components/56/Todo/contexts/TaskProvider';

type SetValue = (value: Tasks) => void;
type todoLocalStorageReturnType = [Tasks, SetValue];

// 스토리지는 key와 value 필요
const useTodoLocalStorage = (
  key: string,
  initialValue: Tasks
): todoLocalStorageReturnType => {
  const [storedValue, setStoredValue] = useState<Tasks>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return initialValue;
      }
    }
  });

  // 로컬스토리지에 값을 저장하는 함수
  const setValue: SetValue = (value: Tasks) => {
    try {
      // 상태를 업데이트 해주고, 로컬스토리지에 값 갱신
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  // 상태와 함수 반환
  return [storedValue, setValue];
};

export default useTodoLocalStorage;
