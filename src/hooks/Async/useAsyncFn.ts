// 비동기 로직을 제거하기 위해 사용되는 훅
// 네트워크, timeout 로직이 있을 때 사용

import { useCallback, useRef, useState } from 'react';

type State<T> = {
  isLoading: boolean;
  value?: T;
  error?: Error;
};

// type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

const useAsyncFn = <
  T extends (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>
>(
  fn: T, // 비동기 작업을 수행하고 그 결과를 반환하는 함수
  deps: React.DependencyList
): [State<Awaited<ReturnType<T>>>, (...args: Parameters<T>) => void] => {
  // 실행에 대한 Id기록(비동기 함수 여러번 호출시 젤 마지막에 호출된 콜백의 value만 기록
  const lastCallId = useRef(0);
  // 3가지로 상태 관리 됨
  // 로딩여부, 결과적으로 리턴될 value, 에러 발생 처리
  const [state, setState] = useState<State<Awaited<ReturnType<T>>>>({
    isLoading: false,
    value: undefined,
    error: undefined,
  });

  // useCallback을 이용해서 실행할 함수(비동기 함수) 정의
  const callback = useCallback((...args: Parameters<T>) => {
    const callId = ++lastCallId.current; // Id 하나씩 증가
    // 로딩중이 아니면
    if (!state.isLoading) {
      setState({ ...state, isLoading: true });
    }
    // 함수를 호출하고 비동기 처리
    // 만약, 비동기 로직이 성공했으면,
    return fn(...args).then(
      (value) => {
        // 같을때만 상태 업데이트
        callId === lastCallId.current && setState({ value, isLoading: false });
        return value;
        // 실패했다면
      },
      (error) => {
        callId === lastCallId.current && setState({ error, isLoading: false });
        return error;
      }
    );
    // eslint-disable-next-line
  }, deps);
  return [state, callback];
};

export default useAsyncFn;
