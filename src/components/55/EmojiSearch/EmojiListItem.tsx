import styled from '@emotion/styled';

const ListItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

const Symbol = styled.div`
  font-size: 24px;
  margin-right: 16px;
`;

const Title = styled.div`
  width: 200px;
`;

// 나머지 영역 차지
const Keywords = styled.div`
  flex: 1;
`;

export type EmojisProps = {
  title: string;
  symbol: string;
  keywords: string;
};

// 선택하기 나름이다. 이 컴포넌트가 얼마나 구체적이여야 하는지의 정도를 따져서 결정
//  {emoji} 이렇게 받으면 조금 더 도메인에 강하게 얽혀있는 컴포넌트
// { symbol, title, keywords } 조금 더 범용성이 높은 컴포넌트
// 클릭하면 복사하는 이벤트 -> ListItem에 onClick 이벤트 달아주기
// navigator.clipboard.writeText(emoji.symbol) 복사 기능
const EmojiListItem = ({ emoji }: { emoji: EmojisProps }) => {
  return (
    <ListItem onClick={() => navigator.clipboard.writeText(emoji.symbol)}>
      <Symbol>{emoji.symbol}</Symbol>
      <Title>{emoji.title}</Title>
      <Keywords>{emoji.keywords}</Keywords>
    </ListItem>
  );
};

export default EmojiListItem;
