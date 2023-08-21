import { CSSProperties, HTMLAttributes, useEffect, useState } from 'react';
import { Combine } from '../../types';
import ImageComponent from './Image';
import { css } from '@emotion/react';
import AvatarGroup from './AvatarGroup';

export type AvatarShape = 'circle' | 'round' | 'square';

export type AvatarProps = Combine<
  {
    lazy?: boolean;
    threshold?: number;
    src: string;
    placeholder: string;
    size?: number;
    shape?: AvatarShape;
    alt: string;
    mode?: CSSProperties['objectFit'];
  },
  HTMLAttributes<HTMLDivElement>
>;

const Avatar = ({
  lazy,
  threshold,
  src,
  placeholder,
  size = 70,
  shape = 'circle',
  alt,
  mode = 'cover',
  ...props
}: AvatarProps) => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoad(true);
  }, [src]);

  const shapeCssValueMap: { [key in typeof shape]: string } = {
    circle: '50%',
    round: '4px',
    square: '0px',
  };

  return (
    <div
      css={css`
        position: relative;
        display: inline-block;
        background-color: #eee;
        border: 1px solid #dadada;
        border-radius: ${shapeCssValueMap[shape]};
        overflow: hidden;
      `}
      {...props}
    >
      <ImageComponent
        src={src}
        alt={alt}
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        mode={mode}
        placeholder={placeholder}
        css={css`
          opacity: ${load ? 1 : 0};
          transition: opacity 0.2s ease-out;
        `}
      />
    </div>
  );
};

Avatar.Group = AvatarGroup;

export default Avatar;
