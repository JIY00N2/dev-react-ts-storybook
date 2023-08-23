import { useCallback, useRef, useState } from 'react';

// React.Dispatch<React.SetStateAction<T>>는 React 상태를 업데이트하는 함수의 타입
//  이 타입을 이용하여 useState 훅으로 생성된 상태 변수를 업데이트할 수 있다.
const useRafState = <T>(
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // id 값을 담기 위해 useRef를 이용해 frame값 받기
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  // setState를 이용하기 위한 함수 작성
  const setRafState = useCallback((value: React.SetStateAction<T>) => {
    // 이 함수가 실행되면, 기존에 실행되고 있던 애니메이션프레임 취소
    // 새롭게 할당함
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);
  return [state, setRafState];
};

export default useRafState;

// 여러 컴포넌트에서 공통으로 많이 사용하기 때문에
// 최적화 로직은 넣을 수 있으면 넣자
