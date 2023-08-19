import React, { HTMLAttributes, CSSProperties } from 'react';
import type { AvatarRequiredProps } from './index';
import { Combine } from '~/utils';

type Props = Combine<AvatarRequiredProps, HTMLAttributes<HTMLDivElement>>;
const AvatarGroup = ({
  children,
  shape = 'circle',
  size = 70,
  ...props
}: Props) => {
  // children을 배열화 시킴
  const avatars = React.Children.toArray(children)
    .filter((element) => {
      if (React.isValidElement(element)) {
        if (element.props.type === 'Avatar') {
          return true;
        }
      }
      console.warn("Only accepts Avatar as it's children.");
      return false;
    })
    .map((avatar, index, avatars) => {
      if (React.isValidElement(avatar)) {
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
      }
      return null;
    });

  return (
    <div css={{ paddingLeft: size / 5 }} {...props}>
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
