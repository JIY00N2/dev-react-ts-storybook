import { HTMLAttributes, CSSProperties, useMemo } from 'react';
import styled from '@emotion/styled';
import { Combine } from '~/utils';
import FluxProvider from './context/FluxProvider';

const StyledRow = styled.div<StyledRowProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;

  /* prop들 적용 */
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
`;

type StyledRowProps = {
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
};

type Props = Combine<
  {
    children: React.ReactNode;
    gap: number | [number, number];
  } & StyledRowProps,
  HTMLAttributes<HTMLDivElement>
>;

// Row 안에는 Col컴포넌트가 들어가야 하기 때문에 children을 받아줌
// Col 사이의 여백 gap -> Row에서 gap를 받고, 하위 컴포넌트(Col)에게 넘겨줘야 하는데,
// 그렇게 하지 말고 Context 이용
const Row = ({ children, justify, align, gap, ...props }: Props) => {
  // gapStyle 계산 한 번만 하면 되서 useMemo 사용
  const gapStyle: CSSProperties = useMemo(() => {
    if (Array.isArray(gap)) {
      const horizontalGap = gap[0];
      const verticalGap = gap[1];
      return {
        marginTop: `-${verticalGap / 2}px`,
        marginBottom: `-${verticalGap / 2}px`,
        marginLeft: `-${horizontalGap / 2}px`,
        marginRight: `-${horizontalGap / 2}px`,
      };
    } else {
      return {
        marginLeft: `-${gap / 2}px`,
        marginRight: `-${gap / 2}px`,
      };
    }
  }, [gap]);

  return (
    <FluxProvider gap={gap}>
      <StyledRow
        {...props}
        align={align}
        justify={justify}
        css={{ ...gapStyle, ...props.style }}
      >
        {children}
      </StyledRow>
    </FluxProvider>
  );
};
export default Row;
