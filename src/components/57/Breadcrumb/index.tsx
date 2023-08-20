import React, { HTMLAttributes } from 'react';
import { Combine } from '~/utils';
import styled from '@emotion/styled';
import BreadcrumbItem from './BreadcrumbItem';

const BreadcrumbContainer = styled.nav`
  display: inline-block;
`;

type Props = Combine<
  { children: React.ReactNode; active?: boolean },
  HTMLAttributes<HTMLDivElement>
>;

// 현재 내가 어디에 있는지 알려주는 컴포넌트(헨젤과 그레텔)
const Breadcrumb = ({ children, ...props }: Props) => {
  // 배열화 시키기
  const items = React.Children.toArray(children)
    .filter((element): element is React.ReactElement<Props> => {
      if (
        !React.isValidElement(element) ||
        element.props.type !== 'BreadcrumbItem'
      ) {
        console.warn("Only accepts Breadcrumb. Item as it's a children.");
        return false;
      }
      return true;
    })
    .map((element, index, elements) => {
      return React.cloneElement(element, {
        ...element.props,
        active: index === elements.length - 1,
      });
    });

  return <BreadcrumbContainer {...props}>{items}</BreadcrumbContainer>;
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
