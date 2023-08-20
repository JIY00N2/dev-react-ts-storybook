// Spinner는 보통 svg로 많이 만든다.
import styled from '@emotion/styled';
import { CSSProperties, HTMLAttributes } from 'react';
import { Combine } from '~/utils';

const Icon = styled.i`
  display: inline-block;
  vertical-align: middle;
`;

type Props = Combine<
  {
    size: number;
    color: string;
    loading: boolean;
  },
  HTMLAttributes<HTMLElement>
>;

const Spinner = ({ size = 24, color = '#919EAB', loading = true }: Props) => {
  const sizeStyle: CSSProperties = {
    width: size,
    height: size,
  };
  // loading이 true면 보여주고, 아니면 안보여준다.
  return loading ? (
    <Icon>
      <svg
        viewBox='0 0 38 38'
        xmlns='http://www.w3.org/2000/svg'
        // style=>css={{}}
        style={sizeStyle}
      >
        <g fill='none' fillRule='evenodd'>
          <g transform='translate(1 1)'>
            <path
              d='M36 18c0-9.94-8.06-18-18-18'
              stroke={color}
              strokeWidth='2'
            >
              <animateTransform
                attributeName='transform'
                type='rotate'
                from='0 18 18'
                to='360 18 18'
                dur='0.9s'
                repeatCount='indefinite'
              />
            </path>
            <circle fill={color} cx='36' cy='18' r='1'>
              <animateTransform
                attributeName='transform'
                type='rotate'
                from='0 18 18'
                to='360 18 18'
                dur='0.9s'
                repeatCount='indefinite'
              />
            </circle>
          </g>
        </g>
      </svg>
    </Icon>
  ) : null;
};

export default Spinner;
