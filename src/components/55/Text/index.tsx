import './index.css';

type FontSize = 'small' | 'normal' | 'large';

export interface Props {
  children: React.ReactNode;
  block?: boolean;
  paragraph?: boolean;
  size?: FontSize | number;
  strong?: boolean;
  underline?: boolean;
  delete?: boolean;
  color?: string;
  mark?: boolean;
  code?: boolean;
}

const Text = ({
  children,
  block,
  paragraph,
  size,
  strong,
  underline,
  delete: del,
  color,
  mark,
  code,
  ...props
}: Props) => {
  // 태그 동적으로 사용하기
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';

  // 폰트 스타일
  const fontStyle = {
    fontSize: typeof size === 'number' ? size : undefined,
    fontWeight: strong ? 'bold' : undefined,
    textDecoration: underline ? 'underline' : undefined,
    color,
  };

  // 취소선
  // del이 true면 div 태그 안에 del 태그가 감싸서 들어감
  if (del) {
    children = <del>{children}</del>;
  }

  // 마크 표시
  if (mark) {
    children = <mark>{children}</mark>;
  }

  // 마크 표시
  if (code) {
    children = <code>{children}</code>;
  }

  return (
    <Tag
      className={typeof size === 'string' ? `Text--size-${size}` : undefined}
      style={{ ...fontStyle, ...props }}
      {...props}
    >
      {children}
    </Tag>
  );
};
export default Text;
