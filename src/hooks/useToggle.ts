import { Dispatch, SetStateAction, useCallback, useState } from 'react';

const useToggle = (
  initialState = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(initialState);
  // useCallback 훅은 의존성 배열에 있는 상태 값이 변경되면 새로 메모이제이션을 함
  // useState의 setState는 값을 받을 수도 있고, 콜백을 받을 수도 있음
  // 위 useCallback에서 useState(!state) 이렇게 상태를 값으로 쓰면 useCallback 의존성 배열에 state를 추가해야함
  // useCallback의 콜백이 state를 바꾹니까 결국 메모이제션이 계속 초기화 됨
  // 그냥 오버헤드만 큰 쓰레기가 되어버림
  // 근데 setState가 콜백을 받을 수 있는 걸 이용하면, 의존성 배열에 아무것도 추가할 필요가 없음
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle, setState];
};
export default useToggle;

// useEffect -> 이벤트 바인딩시 쓰임, 마운트 언마운트 느낌
