import { useRef, useEffect } from 'react';

type ResizeHandler = (contentRect: DOMRectReadOnly) => void;

const useResize = <T extends HTMLElement = HTMLElement>(
  handler: ResizeHandler
) => {
  const savedHandler = useRef<ResizeHandler>(handler);
  const ref = useRef<T | null>(null);

  // 최적화
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    // 있으면 옵저버 달아주기
    const observer = new ResizeObserver((entries) => {
      // element하나만 다루기 때문에 0번째 + 해당 element의 크기 받을 수 있도록 처리
      savedHandler.current(entries[0].contentRect);
    });
    // observer가 element의 크기가 변했을때 감지해서 함수 실행시킴
    observer.observe(element);

    return () => {
      // 옵저버 연결 끊기
      observer.disconnect();
    };
  });
  return ref;
};

export default useResize;
