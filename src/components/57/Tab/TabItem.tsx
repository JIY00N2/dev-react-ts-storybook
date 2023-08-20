import styled from '@emotion/styled';
import Text from '~/components/55/Text';

const TabItemWrapper = styled.div<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 60px;
  background-color: ${({ active }) => (active ? ' #ddf' : '#eee')};
  cursor: pointer;
`;

export type TabItemProps = {
  children?: React.ReactNode;
  type: 'TabItem';
  title: string;
  index: string;
  active: boolean;
  onClick?: () => void;
};

// title: Tab의 이름을 나타냄, index: tab아이템의 key값
// active: 부모(Tab)으로부터 부여받음
const TabItem = ({ title, active, ...props }: TabItemProps) => {
  return (
    <TabItemWrapper active={active} {...props}>
      <Text strong={active}>{title}</Text>
    </TabItemWrapper>
  );
};
export default TabItem;
