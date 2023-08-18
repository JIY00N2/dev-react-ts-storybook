import styled from '@emotion/styled';
import { CSSProperties, HTMLAttributes } from 'react';
// 한 줄 다 차지 하지 않게 하기 위해서 inline-block으로 설정
const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// sup 태그는 윗첨자 텍스트를 표현할 떄 사용
// 오른쪽 맨 위가 중앙 좌표
const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 20px;
  color: white;
  background-color: #f44;
  transform: translate(50%, -50%);

  &.dot {
    padding: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
`;

type Props = {
  children: React.ReactNode;
  count: number;
  maxCount?: number;
  showZero?: boolean;
  dot?: boolean;
  backgroundColor?: string;
  textColor?: string;
} & HTMLAttributes<HTMLDivElement>;

// dot: 숫자가 없고 점만 있는 형태의 뱃지
const Badge = ({
  children,
  count,
  maxCount,
  showZero,
  dot = false,
  backgroundColor,
  textColor,
  ...props
}: Props) => {
  const colorStyle: CSSProperties = {
    backgroundColor,
    color: textColor,
  };

  // count가 0보다 작고, showZero가 true면 안보여주기
  // dot가 있으면 dot로 보여주기
  if (count <= 0 && !showZero) {
    return <BadgeContainer {...props}>{children}</BadgeContainer>;
  }
  if (dot) {
    return (
      <BadgeContainer {...props}>
        {children}
        <Super className='dot' style={{ backgroundColor }} />
      </BadgeContainer>
    );
  }
  return (
    <BadgeContainer {...props}>
      {children}
      <Super style={{ ...colorStyle }}>
        {maxCount && maxCount < count ? `${maxCount}+` : count}
      </Super>
    </BadgeContainer>
  );
};
export default Badge;
