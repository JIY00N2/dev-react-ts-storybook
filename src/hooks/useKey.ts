import { useCallback, useEffect } from 'react';

const useKey = (
  event: 'keydown' | 'keyup',
  targetKey: string,
  handler: () => void
) => {
  const handleKey = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        handler();
      }
    },
    [handler, targetKey]
  );

  useEffect(() => {
    window.addEventListener(event, handleKey);
    return () => {
      window.removeEventListener(event, handleKey);
    };
  }, [event, handleKey]);
};
export default useKey;
