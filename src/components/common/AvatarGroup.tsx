import React, { HTMLAttributes } from 'react';
import { Combine } from '../../types';
import { AvatarProps, AvatarShape } from './Avatar';
import { css } from '@emotion/react';

type AvatarGroupProps = Combine<
  {
    children: React.ReactNode;
    shape?: AvatarShape;
    size?: number;
  },
  HTMLAttributes<HTMLDivElement>
>;

const AvatarGroup = ({
  children,
  shape = 'circle',
  size = 70,
  ...props
}: AvatarGroupProps) => {
  const avatars = React.Children.toArray(children)
    .filter((element): element is React.ReactElement<AvatarProps> => {
      if (!React.isValidElement(element)) {
        return false;
      }
      if (element.props.type !== 'Avatar') {
        return false;
      }
      return true;
    })
    .map((avatar, index, avatars) =>
      React.cloneElement(avatar, {
        ...avatar.props,
        size,
        shape,
        style: {
          ...avatar.props.style,
          marginLeft: -size / 5,
          zIndex: avatars.length - index,
        },
      })
    );

  return (
    <div
      css={css`
        padding-left: ${size / 5}px;
      `}
      {...props}
    >
      {avatars}
    </div>
  );
};

export default AvatarGroup;
