import { useRef, useEffect, useCallback } from 'react';
// 웹 사이트에서 반복적인 로직을 처리할 떄 사용되는 훅

const useIntervalFn = (fn: () => void, ms: number) => {
  const intervalId = useRef<NodeJS.Timeout | undefined>();
  const callback = useRef(fn);

  useEffect(() => {
    // 함수가 변했을 경우 다시 할당
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    clear;
  }, [clear]);

  return [run, clear];
};
export default useIntervalFn;

// callback을 useRef로 받는 것이 매우 중요
// setInterval(setTimeout)을 통해 interval이 시작된 후에 fn이 바뀌면
// 처음부터 다시 interval을 시작한다던지 문제가 생김
// but useRef 사용시 중간에 callback함수 fn이 변하더라도 setInterval이 끝나지 않음
