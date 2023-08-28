import { CSSProperties } from 'react';

type HeadingTag = 1 | 2 | 3 | 4 | 5 | 6;

interface HeaderProps {
  children: React.ReactNode;
  level?: HeadingTag;
  strong?: boolean;
  underline?: boolean;
  color?: string;
}

const Header = ({
  children,
  level = 1,
  strong,
  underline,
  color,
  ...props
}: HeaderProps) => {
  const Tag: keyof HTMLElementTagNameMap = `h${level}`;

  const fontStyle: CSSProperties = {
    fontWeight: strong ? 'bold' : 'normal',
    textDecoration: underline ? 'underline' : undefined,
    color,
  };

  return (
    <Tag style={{ ...fontStyle, ...props }} {...props}>
      {children}
    </Tag>
  );
};

export default Header;
