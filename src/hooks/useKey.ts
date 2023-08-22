import { useCallback, useEffect } from 'react';
// event: 어떤 이벤트로 동작하게 할 것인지 keydown or keyup
// targetKey: 어떤 key를 입력하게 할 것 인지
// handler: 키가 입력되면 어떻게 처리할 것인지

// type Props = {
//   event: 'keydown' | 'keyup';
//   targetKey: string;
//   handler: () => void;
// };

const useKey = (
  event: 'keydown' | 'keyup',
  targetKey: string,
  handler: () => void
) => {
  // 이벤트가 발생했을 때, 처리할 함수
  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      // key와 우리가 넣어준 targetKey와 같으면
      if (event.key === targetKey) {
        // 파라미터로 받은 handler 실행
        handler();
      }
    },
    [handler, targetKey]
  );

  useEffect(() => {
    window.addEventListener(event, handleKey);
    return () => {
      window.removeEventListener(event, handleKey);
    };
  }, [event, handleKey]);
};
export default useKey;
