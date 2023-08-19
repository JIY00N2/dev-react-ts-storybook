import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';
import { Combine } from '~/utils';

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;

const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #aaa;
`;

const Track = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 4px;
  border-radius: 2px;
  background-color: #44b;
  background-size: 20px 20px;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent 100%
  );
  animation: move 1000ms linear infinite;
  transition: width 100ms linear;
  @keyframes move {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 40px 0;
    }
  }
`;

type Props = Combine<{ value?: number }, HTMLAttributes<HTMLDivElement>>;
const Progress = ({ value, ...props }: Props) => {
  return (
    <ProgressContainer {...props}>
      <Rail />
      <Track
        css={css`
          width: ${value}%;
        `}
      />
    </ProgressContainer>
  );
};

export default Progress;
