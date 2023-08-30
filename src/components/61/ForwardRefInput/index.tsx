import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface InputMethods {
  clear: () => void;
  focus: () => void;
}

const Input = forwardRef<InputMethods, object>((_, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // 자식 컴포넌트의 메서드를 부모 컴포넌트에서 직접 호출 할 수 있또록 해주는 훅
  // ref, 함수
  // 상위컴포넌트에서 하위컴포넌트를 사용하기 위한 함수들을 정의해주는 훅

  useImperativeHandle(ref, () => ({
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <>
      {/*상위컴포넌트에서 사용가능, 이 input은 useImpe 사용 못함*/}
      Input: <input ref={inputRef} />
    </>
  );
});

export default Input;
