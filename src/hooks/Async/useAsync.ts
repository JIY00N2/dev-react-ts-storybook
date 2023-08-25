import { useEffect } from 'react';
import useAsyncFn from './useAsyncFn';

const useAsync: <
  T extends (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>
>(
  fn: T,
  args: Parameters<T>,
  deps: React.DependencyList
) => ReturnType<typeof useAsyncFn>[0] = (fn, args, deps) => {
  const [state, callback] = useAsyncFn(fn, deps);

  useEffect(() => {
    callback(...args);
    // eslint-disable-next-line
  }, [callback, ...args, ...deps]);

  return state;
};

export default useAsync;
