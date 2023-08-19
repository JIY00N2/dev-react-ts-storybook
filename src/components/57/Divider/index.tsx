// type :위, 아래나 좌,우로 나눔
// gap: 간격
import styled from '@emotion/styled';
import { HTMLAttributes, CSSProperties } from 'react';
import { Combine } from '~/utils';

const Line = styled.hr`
  border: none;
  background-color: #aaa;

  &.vertical {
    display: inline-block;
    width: 1px;
    height: 13px;
    position: relative;
    top: -1px;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 1px;
  }
`;

type Props = Combine<
  {
    type: 'horizontal' | 'vertical';
    gap?: number;
  },
  HTMLAttributes<HTMLHRElement>
>;

export const Divider = ({ type = 'horizontal', gap = 8, ...props }: Props) => {
  const dividerStyle: CSSProperties = {
    margin: type === 'vertical' ? `0 ${gap}px` : `${gap}px 0`,
  };

  return (
    <Line
      {...props}
      className={type}
      css={{ ...dividerStyle, ...props.style }}
    />
  );
};
export default Divider;
