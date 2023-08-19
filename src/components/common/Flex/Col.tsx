import { HTMLAttributes } from 'react';
import { Combine } from '../../../types';
import { css } from '@emotion/react';
import { useFlexContext } from './context/useFlexContext';

type ColProps = Combine<
  {
    children: React.ReactNode;
    offset?: number;
    span?: number;
  },
  HTMLAttributes<HTMLDivElement>
>;

const Col = ({ children, offset, span, ...props }: ColProps) => {
  const { gap } = useFlexContext();

  const getHorizontalGap = () => {
    if (Array.isArray(gap)) {
      return gap[0] / 2;
    }
    return gap / 2;
  };

  const getVerticalGap = () => {
    if (Array.isArray(gap)) {
      return gap[1] / 2;
    }
    return gap / 2;
  };

  return (
    <div
      css={css`
        max-width: 100%fit-content;
        box-sizing: border-box;
        margin-left: ${offset && `${(offset / 12) * 100}%`};
        width: ${span && `${(span / 12) * 100}%`};
        padding-top: ${getVerticalGap()}px;
        padding-bottom: ${getVerticalGap()}px;

        padding-left: ${getHorizontalGap()}px;
        padding-right: ${getHorizontalGap()}px;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Col;
