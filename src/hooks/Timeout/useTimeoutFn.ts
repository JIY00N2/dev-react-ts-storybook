// 1. 함수 호출을 통한 방법
// 2. 컴포넌트가 로딩 된 후 바로 실행되는 방법

import { useCallback, useEffect, useRef } from 'react';

// fn: 실행할 함수, ms: 몇 초뒤 실행할 것인지
const useTimeoutFn = (fn: () => void, ms: number) => {
  // timeout에 대한 id 기록
  const timeoutId = useRef<NodeJS.Timeout | undefined>();
  const callback = useRef(fn);

  useEffect(() => {
    // 함수가 바뀌었을 경우 처리
    callback.current = fn;
  }, [fn]);

  // timeout이 시작되고 끝나면 fn함수를 실행시키는 함수
  const run = useCallback(() => {
    // timeoutId가 있다면, clearTimeout을 통해 해제
    timeoutId.current && clearTimeout(timeoutId.current);
    // setTimeout 실행
    timeoutId.current = setTimeout(() => {
      // fn 함수 실행
      callback.current();
    }, ms);
  }, [ms]);

  // timeout을 해제하는 함수
  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  // useEffect(() => {
  //   return () => {
  //     clear();
  //   };
  // }, [clear]);

  // 훅이 사라질 때, clear
  useEffect(() => {
    clear;
  }, [clear]);

  return { run, clear };
};

export default useTimeoutFn;
