import { useRef, useEffect } from 'react';
import useRafState from './useRafState';

const useScroll = <T extends HTMLElement = HTMLElement>(): [
  React.MutableRefObject<T | null>,
  { x: number; y: number }
] => {
  // 좌표 상태를 저장할 state
  const [state, setState] = useRafState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  // 어떤 요소의 좌표를 추적할지
  const ref = useRef<T | null>(null);
  // useEffect를 이용해서 이벤트 달아주기
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 스크롤 이벤트가 발생하면 브라우저가 reflow(다시 렌더링)를 발생
    // 약간의 성능 이득을 위해 request animation 사용
    const handleScroll = () => {
      setState({ x: element.scrollLeft, y: element.scrollTop });
    };
    // 스크롤 성능 향상을 위한 옵션으로 true일 경우, 스크롤을 위해 블록되는 것을 방지한다.
    // 이 경우, preventDefault를 사용할 수 없다.
    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref, setState]);

  return [ref, state];
};

export default useScroll;
