import { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { v4 } from 'uuid';
import ToastItem from './ToastItem';

const Container = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1500;
`;

type ToastProps = {
  id: string;
  message: string;
  duration: number;
};

type ToastManagerProps = {
  bind: (createToast: (message: string, duration: number) => void) => void;
};

// 컴포넌트
// bind prop을 통해 createToast를 넘겨줌
const ToastManager = ({ bind }: ToastManagerProps) => {
  // Toast 상태 관리
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  // Toast 생성
  const createToast = useCallback((message: string, duration: number) => {
    const newToast: ToastProps = {
      id: v4(),
      message,
      duration,
    };
    setToasts((oldToasts) => [...oldToasts, newToast]);
  }, []);
  // Toast 삭제
  const removeToast = useCallback((id: string) => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id));
  }, []);
  // bind로 함수 넘겨주기
  useEffect(() => {
    bind(createToast);
  }, [bind, createToast]);

  // onDone: 토스트 끝났는지 여부
  // id = {id}
  return (
    <Container>
      {toasts.map(({ id, message, duration }) => (
        <ToastItem
          key={id}
          message={message}
          duration={duration}
          onDone={() => removeToast(id)}
        />
      ))}
    </Container>
  );
};

export default ToastManager;
