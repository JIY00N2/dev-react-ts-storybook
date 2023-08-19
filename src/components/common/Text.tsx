import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

type FontSize = 'small' | 'normal' | 'large' | number;
type Props = {
  as?: keyof HTMLElementTagNameMap;
  children: ReactNode;
  del?: boolean;
  size?: FontSize;
  strong?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: string;
} & HTMLAttributes<HTMLElement>;

function getFontSize(size: FontSize) {
  if (typeof size === 'number') {
    return size;
  }
  switch (size) {
    case 'small':
      return 12;
    case 'normal':
      return 14;
    case 'large':
      return 16;
  }
}

const Text = ({
  as: Tag = 'span',
  children,
  del,
  underline,
  code,
  size,
  strong,
  color,
  ...props
}: Props) => {
  const fontStyle: CSSProperties = {
    textDecoration: underline ? 'underline' : undefined,
    fontSize: size && getFontSize(size),
    fontWeight: strong ? 'bold' : undefined,
    color,
  };

  if (del) {
    children = <del>{children}</del>;
  }
  if (code) {
    children = <code>{children}</code>;
  }

  return (
    <Tag {...props} style={{ ...fontStyle }}>
      {children}
    </Tag>
  );
};

export default Text;
