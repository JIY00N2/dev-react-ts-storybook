import { useEffect } from 'react';
// 특정 기간내에 같은 이벤트가 호출되었을 경우 가장 마지막 이벤트만 호출 되도록 함

import useTimeoutFn from './Timeout/useTimeoutFn';

// 실행될 함수, 지연시간, 관련 의존성
const useDebounce = (
  fn: () => void,
  ms: number,
  deps: React.DependencyList
) => {
  const { run, clear } = useTimeoutFn(fn, ms);

  // deps가 변경될 때마다 run이 실행 됨
  // 특정 초 이내에 deps와 관련된 내용이 바뀔 경우
  // 기존에 실행되던 setTimeout은 종료되고, 다시 run
  // eslint-disable-next-line
  useEffect(run, deps);

  return clear;
};

export default useDebounce;
