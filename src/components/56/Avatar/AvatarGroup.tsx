import React, { HTMLAttributes, CSSProperties } from 'react';
import type { Shape } from './index';
import { Combine } from '~/utils';
import { css } from '@emotion/react';

type Props = Combine<
  {
    children: React.ReactNode;
    shape?: Shape;
    size?: number;
  },
  HTMLAttributes<HTMLDivElement>
>;

const AvatarGroup = ({
  children,
  shape = 'circle',
  size = 70,
  ...props
}: Props) => {
  // children을 배열화 시킴
  const avatars = React.Children.toArray(children)
    .filter((element): element is React.ReactElement<Props> => {
      if (!React.isValidElement(element) || element.props.type !== 'Avatar') {
        console.warn("Only accepts Avatar as it's children.");
        return false;
      }
      return true;
    })
    .map((avatar, index, avatars) => {
      const AvatarStyle: CSSProperties = {
        ...avatar.props.style,
        marginLeft: -size / 5,
        zIndex: avatars.length - index,
      };
      return React.cloneElement(avatar, {
        ...avatar.props,
        size,
        shape,
        style: AvatarStyle,
      });
    });

  return (
    <div
      css={css`
        padding-left: size / 5;
      `}
      {...props}
    >
      {avatars}
    </div>
  );
};

export default AvatarGroup;

// 이런 형식으로 만들자
/* <Avatar.Group>
  <Avatar/>
  <Avatar/>
</Avatar.Group> */
