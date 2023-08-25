import { HTMLAttributes, useEffect, useMemo } from 'react';
import { Combine } from '../../types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { createPortal } from 'react-dom';
import { useClickAway } from '../../hooks';

type ModalProps = Combine<
  {
    children: React.ReactNode;
    width?: number;
    height?: number;
    visible?: boolean;
    onClose: () => void;
  },
  HTMLAttributes<HTMLDivElement>
>;

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

const Modal = ({
  children,
  width = 500,
  height = width,
  visible = false,
  onClose,
  ...props
}: ModalProps) => {
  const ref = useClickAway<HTMLDivElement>(() => onClose());
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return createPortal(
    <BackgroundDim
      css={css`
        display: ${visible ? 'block' : 'none'};
      `}
    >
      <ModalContainer
        ref={ref}
        css={css`
          width: ${width}px;
          height: ${height}px;
        `}
        {...props}
      >
        {children}
      </ModalContainer>
    </BackgroundDim>,
    el
  );
};

export default Modal;
