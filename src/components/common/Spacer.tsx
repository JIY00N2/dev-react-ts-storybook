import React, { CSSProperties, HTMLAttributes } from 'react';

type Props = {
  children: React.ReactNode;
  type?: 'horizontal' | 'vertical';
  size?: number;
} & HTMLAttributes<HTMLDivElement>;

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
    <div {...props} style={spacerStyle}>
      {nodes}
    </div>
  );
};

export default Spacer;
