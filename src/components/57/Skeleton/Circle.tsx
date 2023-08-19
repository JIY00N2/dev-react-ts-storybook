import Base from './Base';
import styled from '@emotion/styled';

// 컴포넌트도 styled가 받을 수 있따.
const Circle = styled(Base)<{ size?: number | string }>`
  width: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  height: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  border-radius: 50%;
`;

export default Circle;
