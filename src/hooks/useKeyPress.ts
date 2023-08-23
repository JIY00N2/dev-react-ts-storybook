import { useCallback, useEffect, useState } from 'react';

const useKeyPress = (targetKey: string) => {
  const [state, setState] = useState(false);

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setState(true);
      }
    },
    [targetKey]
  );

  const handleKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setState(false);
      }
    },
    [targetKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return state;
};

export default useKeyPress;
