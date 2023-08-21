import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import Text from '~/components/55/Text';
import Icon from '../../56/Icon';
import { Combine } from '~/utils';

const BreadcrumbItemContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

export type BreadcrumbItemProps = Combine<
  {
    // type: 'BreadcrumbItem';
    children: React.ReactNode;
    href?: string;
    active?: boolean;
  },
  HTMLAttributes<HTMLDivElement>
>;

// href: 링크 주소, 컴포넌트가 active 상태인지
const BreadcrumbItem = ({
  children,
  href,
  active,
  ...props
}: BreadcrumbItemProps) => {
  return (
    <BreadcrumbItemContainer {...props}>
      <Anchor href={href}>
        <Text size={14} strong={active}>
          {children}
        </Text>
      </Anchor>
      {!active && <Icon name='chevron-right' size={22} strokeWidth={1} />}
    </BreadcrumbItemContainer>
  );
};

export default BreadcrumbItem;
