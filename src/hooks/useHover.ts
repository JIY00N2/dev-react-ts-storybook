import { useCallback, useEffect, useRef, useState } from 'react';

const useHover = (): [React.RefObject<HTMLDivElement>, boolean] => {
  // hover 중 일때의 상태 true, false
  const [state, setState] = useState(false);
  // element를 받아오기
  const ref = useRef<HTMLDivElement | null>(null);

  const handelMouseOver = useCallback(() => setState(true), []);
  const handelMouseOut = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.addEventListener('mouseover', handelMouseOver);
    element.addEventListener('mouseout', handelMouseOut);

    // 훅이 사라질 떄, eventListener 제거
    return () => {
      element.removeEventListener('mouseover', handelMouseOver);
      element.removeEventListener('mouseout', handelMouseOut);
    };
  }, [ref, handelMouseOver, handelMouseOut]);

  return [ref, state];
};

export default useHover;
