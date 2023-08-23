import { useEffect, useRef } from 'react';

const useResize = <T extends HTMLElement = HTMLElement>(
  handler: (rect: DOMRectReadOnly) => void
) => {
  const savedHandler = useRef(handler);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      savedHandler.current(entries[0].contentRect);
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return ref;
};

export default useResize;
