import { useCallback, useRef, useState } from 'react';

const useRafState = <T>(
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: React.SetStateAction<T>) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  return [state, setRafState];
};

export default useRafState;
