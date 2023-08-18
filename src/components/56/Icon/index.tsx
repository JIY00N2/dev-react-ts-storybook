// 아이콘의 이름, 크기, stroke 너비, 색상
import styled from '@emotion/styled';
import feather, { FeatherIconNames } from 'feather-icons';
import { HTMLAttributes } from 'react';

const IconWrapper = styled.i`
  display: inline-block;
`;

type Props = {
  name: FeatherIconNames;
  size?: number;
  strokeWidth?: number;
  rotate?: number;
  color?: string;
} & HTMLAttributes<HTMLElement>;

type CustomFeatherIconStyle = {
  'stroke-width': string | number;
  stroke: string;
  width: string | number;
  height: string | number;
};

// 대각선을 보기 위해서 회전 기능 넣기 (rotate)
const Icon = ({
  name,
  size = 16,
  strokeWidth = 2,
  rotate,
  color = '#222',
  ...props
}: Props) => {
  // i 태그의 스타일 정의
  const shapeStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };

  const iconStyle: CustomFeatherIconStyle = {
    'stroke-width': strokeWidth,
    stroke: color,
    width: size,
    height: size,
  };

  // 아이콘 이름을 통해 불러오기
  const icon = feather.icons[name];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  // 이미지 태그 이용시 변환해야함
  // svg to base64
  const base64 = btoa(svg);

  return (
    <IconWrapper {...props} css={{ ...shapeStyle }}>
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </IconWrapper>
  );
};

export default Icon;
