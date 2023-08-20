import { useCallback, useEffect, useRef, useState } from 'react';

const useHover = () => {
  const [state, setState] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const handelMouseOver = useCallback(() => setState(true), []);
  const handelMouseOut = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mouseover', handelMouseOver);
      element.addEventListener('mouseout', handelMouseOut);

      // 훅이 사라질 떄, eventListener 제거
      return () => {
        element.removeEventListener('mouseover', handelMouseOver);
        element.removeEventListener('mouseout', handelMouseOut);
      };
    }
  }, [ref, handelMouseOver, handelMouseOut]);

  return [ref, state];
};

export default useHover;
