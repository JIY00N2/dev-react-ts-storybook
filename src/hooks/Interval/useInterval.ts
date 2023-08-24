import useIntervalFn from './useIntervalFn';
import { useEffect } from 'react';
// Fn과 다르게 컴포넌트가 로드되면 바로 실행

const useInterval = (fn: () => void, ms: number) => {
  const [run, clear] = useIntervalFn(fn, ms);

  useEffect(() => {
    run();
    return () => {
      clear;
    };
  }, [run, clear]);
  return clear;
};

export default useInterval;
