import React, { CSSProperties, HTMLAttributes } from 'react';
import { Combine } from '~/utils';

type Props = Combine<
  {
    children: React.ReactNode;
    type?: 'horizontal' | 'vertical';
    size?: number;
  },
  HTMLAttributes<HTMLDivElement>
>;

// type은 간격을 좌우로 만들건지 상하로 만들건지
// size: 어느정도로 간격 넓힌건지
const Spacer = ({
  children,
  type = 'horizontal',
  size = 8,
  ...props
}: Props) => {
  const spacerStyle: CSSProperties = {
    ...props.style,
    display: type === 'vertical' ? 'block' : 'inline-block',
    verticalAlign: type === 'horizontal' ? 'middle' : undefined,
  };

  // 자식 컴포넌트 접근하기 -> 리액트 노드 받아서 처리
  // -> 필터링을 하거나 따른 요소로 바꿔줄 수 있따.
  // filter를 이용해 정말 요소가 맞는지 체크 함 -> 아니라면 지워짐
  // 요소, 인덱스, 전체요소들
  // cloneElement로 속성을 넣어줌
  // 기존 props를 그대로 넣어주고, style만 변경(기존스타일을 살겨주면서 , margin들 넣어주기)
  const nodes = React.Children.toArray(children)
    .filter((element) => React.isValidElement(element))
    .map((element, index, elements) => {
      if (React.isValidElement(element)) {
        return React.cloneElement(element, {
          ...element.props,
          style: {
            ...element.props.style,
            marginRight:
              type === 'horizontal' && index !== elements.length - 1
                ? size
                : undefined,
            marginBottom:
              type === 'vertical' && index !== elements.length - 1
                ? size
                : undefined,
          },
        });
      } else {
        return element;
      }
    });
  return (
    <div style={spacerStyle} {...props}>
      {nodes}
    </div>
  );
};

export default Spacer;
