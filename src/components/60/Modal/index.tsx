import styled from '@emotion/styled';
import { useMemo, HTMLAttributes, useEffect } from 'react';
import ReactDom from 'react-dom';
import useClickAway from '~/hooks/useClickAway';
import { Combine } from '~/utils';

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

type Props = Combine<
  {
    children?: React.ReactNode;
    width?: number;
    height?: number;
    visible: boolean;
    onClose?: () => void;
  },
  HTMLAttributes<HTMLElement>
>;

// 내용, 모달의 너비와 높이, 모달을 보여줄지 말지, 모달이 닫힐 때 이벤트 호출
const Modal = ({
  children,
  width = 500,
  height,
  visible = false,
  onClose,
  ...props
}: Props) => {
  // 바깥 부분을 클릭했다면, onClose
  const ref = useClickAway<HTMLDivElement>(() => {
    onClose && onClose();
  });

  const containerStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height]
  );

  // 모달은 젤 바깥 쪽에 있어야 함(body 최상위) 리액트 포탈 사용
  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  // ReactDom.createPortal(가상돔, 넣어줄 element )
  return ReactDom.createPortal(
    // 이 돔들을 el에 넣고 싶다.. -> 리액트 포탈 사용
    <BackgroundDim css={{ display: visible ? 'block' : 'none' }}>
      <ModalContainer
        ref={ref}
        css={{ ...props.style, ...containerStyle }}
        {...props}
      >
        {children}
      </ModalContainer>
    </BackgroundDim>,
    el
  );
};

export default Modal;
