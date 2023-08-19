import { CSSProperties, HTMLAttributes } from 'react';
import { Combine } from '../../../types';
import { css } from '@emotion/react';
import FlexProvider from './context/FlexProvider';

type RowProps = Combine<
  {
    children: React.ReactNode;
    justify?: CSSProperties['justifyContent'];
    align?: CSSProperties['alignItems'];
    gap?: number | [number, number];
  },
  HTMLAttributes<HTMLDivElement>
>;

const Row = ({ children, justify, align, gap = 0, ...props }: RowProps) => {
  const getHorizontalGap = () => {
    if (Array.isArray(gap)) {
      return -gap[0] / 2;
    }
    return -gap / 2;
  };

  const getVerticalGap = () => {
    if (Array.isArray(gap)) {
      return -gap[1] / 2;
    }
    return -gap / 2;
  };

  return (
    <FlexProvider gap={gap}>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          box-sizing: border-box;
          justify-content: ${justify};
          align-items: ${align};
          margin-top: ${getVerticalGap()}px;
          margin-bottom: ${getVerticalGap()}px;
          margin-left: ${getHorizontalGap()}px;
          margin-right: ${getHorizontalGap()}px;
        `}
        {...props}
      >
        {children}
      </div>
    </FlexProvider>
  );
};

export default Row;
