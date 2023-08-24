import { useCallback, useRef, useState } from 'react';

type State<T> = {
  value?: T;
  error?: Error;
  isLoading: boolean;
};

const useAsyncFn = <
  T extends (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>
>(
  fn: T,
  deps: React.DependencyList
): [State<Awaited<ReturnType<T>>>, (...args: Parameters<T>) => void] => {
  const lastCallIdRef = useRef(0);
  const [state, setState] = useState<State<Awaited<ReturnType<T>>>>({
    isLoading: false,
  });

  const callback = useCallback(
    (...args: Parameters<T>) => {
      lastCallIdRef.current += 1;
      const callId = lastCallIdRef.current;

      setState((state) => ({ ...state, isLoading: true }));

      return fn(...args)
        .then((value) => {
          if (callId === lastCallIdRef.current) {
            setState({ value, isLoading: false });
          }
        })
        .catch((error: Error) => {
          if (callId === lastCallIdRef.current) {
            setState({ error, isLoading: false });
          }
        });
    },
    // eslint-disable-next-line
    [fn, ...deps]
  );

  return [state, callback];
};

export default useAsyncFn;
