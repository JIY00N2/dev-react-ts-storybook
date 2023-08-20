// 페이지 이동 없이 컨텐츠 스위칭
import React, { HTMLAttributes, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Combine } from '~/utils';
import TabItem, { TabItemProps } from './TabItem';

const TabItemContainer = styled.div`
  border-bottom: 2px solid #ddd;
  background-color: #eee;
`;

type Props = Combine<
  {
    children: React.ReactNode;
    active?: boolean;
  },
  HTMLAttributes<HTMLDivElement>
>;

const childrenToArray = (children: React.ReactNode, types: string) => {
  return React.Children.toArray(children).filter(
    (element): element is React.ReactElement<TabItemProps> => {
      if (React.isValidElement(element) && types.includes(element.props.type)) {
        return true;
      }
      console.warn(
        `Only accepts ${
          Array.isArray(types) ? types.join(',') : types
        } as it's children.`
      );
      return false;
    }
  );
};

// active: 어떤 탭을 클릭했는지 나타내는
const Tab = ({ children, active, ...props }: Props) => {
  // 현재 active가 어떤 값인지 알아야 함
  const [currentActive, setCurrentActive] = useState(() => {
    // 초기화 값 넣어주기
    // active가 있다면 active, 없으면 children의 첫번째 값 넣어주기
    if (active) {
      return active;
    } else {
      const index = childrenToArray(children, 'TabItem')[0].props.index;
      return index;
    }
  });

  const items = useMemo(() => {
    return childrenToArray(children, 'TabItem').map((element) => {
      return React.cloneElement(element, {
        ...element.props,
        key: element.props.index,
        active: element.props.index === currentActive,
        onClick: () => {
          setCurrentActive(element.props.index);
        },
      });
    });
  }, [children, currentActive]);

  const activeItem = useMemo(
    () => items.find((element) => currentActive === element.props.index),
    [currentActive, items]
  );

  return (
    <div {...props}>
      <TabItemContainer>{items}</TabItemContainer>
      <div>{activeItem ? activeItem.props.children : null}</div>
    </div>
  );
};

Tab.Item = TabItem;
export default Tab;

/*
children: 화면 스위칭 시 보여주는 내용
title: tab영역을 나타냄(header부분)
<Tab>
  <Tab.item title='item1'>Content 1</Tab.item>
  <Tab.item title='item2'>Content 2</Tab.item>
</Tab>
*/
