// data들을 받아서 item들을 뿌려주기
import styled from '@emotion/styled';
import EmojiListItem, { EmojisProps } from './EmojiListItem';

const Container = styled.ul`
  width: 100%;
  padding: 0;
`;

type Props = {
  emojis: EmojisProps[];
  keyword: string;
};

// 필터링 기능
const EmojiList = ({ emojis, keyword }: Props) => {
  return (
    <Container>
      {emojis
        .filter(
          (emoji) =>
            emoji.title.indexOf(keyword) >= 0 ||
            emoji.keywords.indexOf(keyword) >= 0
        )
        .slice(0, 10)
        .map((emoji) => (
          <EmojiListItem key={emoji.title} emoji={emoji} />
        ))}
    </Container>
  );
};

export default EmojiList;
