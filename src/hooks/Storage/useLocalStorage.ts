import { Dispatch, SetStateAction, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  // 함수를 initialState로 전달하면 이를 초기화 함수로 취급합니다.
  //  이 함수는 순수해야 하고 인자를 받지 않아야 하며 반드시 어떤 값을 반환해야 합니다.
  // React는 컴포넌트를 초기화할 때 초기화 함수를 호출하고, 그 반환값을 초기 state로 저장합니다.
  const [storedValue, setStoredValue] = useState<T>(() => {
    // 서버 렌더링 환경에서는 로컬 저장소 API를 사용할 수 없으므로
    // SSR및 SSG가 제대로 작동하도록 typeof window !== "undefined"를 확인
    // if (typeof window === 'undefined') {
    //   return initialValue;
    // }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = (value) => {
    try {
      // useState의 함수 처리
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // if (typeof window === 'undefined') {
      //   localStorage.setItem(key, JSON.stringify(valueToStore));
      // }
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
