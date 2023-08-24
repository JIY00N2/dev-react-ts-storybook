import { useEffect, useRef } from 'react';

const events = ['mousedown', 'touchstart'] as const;

const useClickAway = <T extends HTMLElement = HTMLElement>(
  handler: (e: MouseEvent | TouchEvent) => void
) => {
  const ref = useRef<T | null>(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const handleEvent = (e: MouseEvent | TouchEvent) => {
      if (!(e.target instanceof Node)) {
        return;
      }
      const isAway = !element.contains(e.target);
      if (isAway) {
        savedHandler.current(e);
      }
    };

    events.forEach((eventName) =>
      document.addEventListener(eventName, handleEvent)
    );
    return () => {
      events.forEach((eventName) =>
        document.removeEventListener(eventName, handleEvent)
      );
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
