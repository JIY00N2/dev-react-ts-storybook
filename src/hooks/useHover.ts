import { useCallback, useEffect, useRef, useState } from 'react';

const useHover = <T extends HTMLElement>(): [
  React.MutableRefObject<T | null>,
  boolean
] => {
  const [state, setState] = useState(false);
  const ref = useRef<T | null>(null);

  const handleMouseOver = useCallback(() => setState(true), []);
  const handleMouseOut = useCallback(() => setState(false), []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const element = ref.current;
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);
    return () => {
      element.removeEventListener('mouseover', handleMouseOver);
      element.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseOver, handleMouseOut]);

  return [ref, state];
};

export default useHover;
