import { HTMLAttributes, useMemo, CSSProperties } from 'react';
import styled from '@emotion/styled';
import { Combine } from '~/utils';
import { useFluxContext } from './context/useFluxContext';

const StyledCol = styled.div<StyledColProps>`
  max-width: 100%fit-content;
  box-sizing: border-box;

  width: ${({ span }) => span && `${(span / 12) * 100}%`};
  margin-left: ${({ offset }) => offset && `${(offset / 12) * 100}%`};
`;

type StyledColProps = {
  span?: number;
  offset?: number;
};

type Props = Combine<
  { children: React.ReactNode } & StyledColProps,
  HTMLAttributes<HTMLDivElement>
>;

const Col = ({ children, span, offset, ...props }: Props) => {
  // 각 Col에서 useFluxContext을 통해 값을 받아 옴
  const { gap } = useFluxContext();
  // gapStyle 계산 한 번만 하면 되서 useMemo 사용
  const gapStyle: CSSProperties = useMemo(() => {
    if (Array.isArray(gap)) {
      const horizontalGap = gap[0];
      const verticalGap = gap[1];
      return {
        paddingTop: `${verticalGap / 2}px`,
        paddingBottom: `${verticalGap / 2}px`,
        paddingLeft: `${horizontalGap / 2}px`,
        paddingRight: `${horizontalGap / 2}px`,
      };
    } else {
      return {
        paddingLeft: `${gap / 2}px`,
        paddingRight: `${gap / 2}px`,
      };
    }
  }, [gap]);

  return (
    <StyledCol
      {...props}
      span={span}
      offset={offset}
      css={{ ...gapStyle, ...props.style }}
    >
      {children}
    </StyledCol>
  );
};

export default Col;
