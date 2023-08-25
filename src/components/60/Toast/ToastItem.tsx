import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import Text from '~/components/55/Text';
import useTimeout from '~/hooks/Timeout/useTimeout';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 450px;
  height: 70px;
  padding: 0 20px;
  align-items: center;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  // 돔이 그대로 사라져서 상태 하나 추가
  opacity: 1;
  transition: opacity 0.4s ease-out;

  &:first-of-type {
    animation: move 0.4s ease-out forwards;
  }

  // 첫번째 요소를 제외하고 위에 margin
  &:not(:first-of-type) {
    margin-top: 8px;
  }

  @keyframes move {
    0% {
      margin-top: 80px;
    }
    100% {
      margin-top: 0;
    }
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 4px;
  background-color: #44b;
  animation-name: progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;

type Props = {
  message: string;
  duration: number;
  onDone: () => void;
};

const ToastItem = ({ message, duration, onDone }: Props) => {
  const [show, setShow] = useState(true);

  // duration만큼 시간이 지나면 onDone 호출(Toast 사라짐)
  useTimeout(() => {
    setShow(false);
    setTimeout(() => {
      onDone();
    }, 400);
  }, duration);

  return (
    <Container css={{ opacity: show ? 1 : 0 }}>
      <ProgressBar
        css={css`
          animation-duration: ${duration}ms;
        `}
      />
      <Text>{message}</Text>
    </Container>
  );
};

export default ToastItem;
