import { useEffect } from 'react';
import useTimeoutFn from './useTimeoutFn';

const useDebounce = (
  fn: () => void,
  ms: number,
  deps: React.DependencyList
) => {
  const { run } = useTimeoutFn(fn, ms);

  useEffect(() => {
    console.log(deps);
    run();
    //eslint-disable-next-line
  }, [run, ...deps]);
};

export default useDebounce;
