import { useRef, useEffect } from 'react';
// 특정영역 외 부분을 클릭하면 이벤트 발생시키는 훅
// 모달이나 팝업 처리에 사용

// 두가지 이벤트를 받을 수 있음
// touchstart는 모바일 용
const events: Array<'mousedown' | 'touchstart'> = ['mousedown', 'touchstart'];
type handlerType = (event: MouseEvent | TouchEvent) => void;

// 바깥 부분을 클릭했을 때, 실행되는 이벤트를 매개변수로 받음
const useClickAway = <T extends HTMLElement = HTMLElement>(
  handler: handlerType
) => {
  const ref = useRef<T | null>(null);
  // useRef를 통해 소소한 성능 개선 가능
  // 핸들러가 바뀔 경우에 이벤트를 remove 했다가 다시 add함
  const savedHandler = useRef(handler);

  // useClickAway전체가 렌더링되지 않고, useRef 값만 바뀌게 됨
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handleEvent = (e: MouseEvent | TouchEvent) => {
      if (!(e.target instanceof Node)) {
        return;
      }
      // 이벤트 타겟이 해당 element에 포함이 되어있는지 체크
      // 포함되어있지 않으면 받은 이벤트 handler를 통해 실행
      if (!element.contains(e.target)) {
        savedHandler.current(e);
      }
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent);
      }
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
