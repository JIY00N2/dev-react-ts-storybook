import { useCallback, useEffect, useRef } from 'react';

const useTimeoutFn = (fn: () => void, ms: number) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutIdRef.current && clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => fnRef.current(), ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutIdRef.current && clearTimeout(timeoutIdRef.current);
  }, []);

  return { run, clear };
};

export default useTimeoutFn;
