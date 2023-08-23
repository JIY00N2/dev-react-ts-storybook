import { useEffect, useRef } from 'react';
import useRafState from './useRafState';

const useScroll = <T extends HTMLElement = HTMLElement>() => {
  const [state, setState] = useRafState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const handleScroll = () => {
      setState({
        x: element.scrollLeft,
        y: element.scrollTop,
      });
    };
    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref, setState]);

  return { ref, state };
};

export default useScroll;
