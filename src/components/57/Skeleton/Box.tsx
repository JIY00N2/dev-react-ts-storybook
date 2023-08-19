import Base from './Base';
import styled from '@emotion/styled';

type Props = {
  width?: number | string;
  height?: number | string;
};

// 컴포넌트도 styled가 받을 수 있따.
const Box = styled(Base)<Props>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`;

export default Box;
