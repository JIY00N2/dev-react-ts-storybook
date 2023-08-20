import { useState } from 'react';
import emojiJson from './data/emoji.json';
import Header from './components/55/EmojiSearch/Header';
import SearchBox from './components/55/EmojiSearch/SearchBox';
import EmojiList from './components/55/EmojiSearch/EmojiList';

function App() {
  // onSearch 이벤트가 발생할 때, useState 값 변화
  const [keyword, setKeyword] = useState('');

  return (
    <div>
      <Header />
      <SearchBox onSearch={setKeyword} />
      {/* keyword를 SearchBox 컴포넌트에서 받을 수 있게 됨 */}
      <EmojiList emojis={emojiJson} keyword={keyword} />
    </div>
  );
}

export default App;

/*import { Todo } from './components/56/Todo';

function App() {
  return <Todo />;
}

export default App;
*/
