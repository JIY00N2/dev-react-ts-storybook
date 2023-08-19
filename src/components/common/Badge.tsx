import styled from '@emotion/styled';
import { BuildFCProps } from '../../types';

type BadgeProps = BuildFCProps<
  {
    count: number;
    maxCount?: number;
    backgroundColor?: string;
    textColor?: string;
    showZero?: boolean;
    dot?: boolean;
  },
  HTMLDivElement
>;

const Badge = ({
  children,
  count,
  maxCount,
  backgroundColor,
  textColor,
  showZero = false,
  dot = false,
  ...props
}: BadgeProps) => {
  if (!showZero && count === 0) {
    return <BadgeContainer {...props}>{children}</BadgeContainer>;
  }

  if (dot) {
    return (
      <BadgeContainer {...props}>
        {children}
        <Super className="dot" css={{ backgroundColor }} />
      </BadgeContainer>
    );
  }

  return (
    <BadgeContainer {...props}>
      {children}
      <Super css={{ backgroundColor, color: textColor }}>
        {maxCount && count > maxCount ? `${maxCount}+` : count}
      </Super>
    </BadgeContainer>
  );
};

const BadgeContainer = styled.div`
  position: absolute;
  display: inline-block;
`;

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  color: white;
  border-radius: 20px;
  background-color: #f44;
  transform: translate(50%, -50%);

  &.dot {
    padding: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
`;

export default Badge;
