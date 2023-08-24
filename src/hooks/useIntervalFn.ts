import { useCallback, useEffect, useRef } from 'react';

const useIntervalFn = (fn: () => void, ms: number) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => fnRef.current(), ms);
  }, [ms]);

  const clear = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  useEffect(() => clear, [clear]);

  return { run, clear };
};

export default useIntervalFn;
