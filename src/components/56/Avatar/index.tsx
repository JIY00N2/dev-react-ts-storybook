import styled from '@emotion/styled';
import ImageComponent from '~/components/55/ImageComponent';
import { useState, useEffect } from 'react';
import type { ImageRequiredProps } from '~/components/55/ImageComponent';
import AvatarGroup from './AvatarGroup';
// Avatar:  사용자의 프로필 사진(SNS에 자주 쓰임)
// 이미지 컴포넌트를 사용

const ShapeToCssValue = {
  circle: '50%',
  round: '4px',
  square: '0px',
};

const AvatarWrapper = styled.div<{ shape: Shape }>`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  overflow: hidden;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  background-color: #eee;
  > img {
    transition: opacity 0.2s ease-out;
  }
`;

export type Shape = 'circle' | 'round' | 'square';

export type AvatarRequiredProps = {
  type: 'Avatar';
  shape?: Shape;
  size?: number;
};

type Props = AvatarRequiredProps & ImageRequiredProps;

const Avatar = ({
  lazy,
  threshold,
  src,
  size = 70,
  shape = 'circle', // round, square
  placeholder,
  alt,
  mode = 'cover',
  ...props
}: Props) => {
  // 이미지 로딩 중일 때, 불러오는거 트랜지션 적용하기
  const [loaded, setLoaded] = useState(false);
  // useEffect를 통해 이미지 로드가 되는지 확인
  // 브라우저에 내장된 Image 오브젝트 사용
  useEffect(() => {
    const image = new Image();
    // 이미지 오브젝트에 src 정해줌
    image.src = src;
    // 들어간 순간 onload 이벤트 실행될 수 있다 -> setLoaded를 true로 변경
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
};

Avatar.Group = AvatarGroup;

export default Avatar;
