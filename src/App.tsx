// import { useState } from 'react';
// import emojiJson from './data/emoji.json';
// import Header from './components/55/EmojiSearch/Header';
// import SearchBox from './components/55/EmojiSearch/SearchBox';
// import EmojiList from './components/55/EmojiSearch/EmojiList';

// function App() {
//   // onSearch 이벤트가 발생할 때, useState 값 변화
//   const [keyword, setKeyword] = useState('');

//   return (
//     <div>
//       <Header />
//       <SearchBox onSearch={setKeyword} />
//       {/* keyword를 SearchBox 컴포넌트에서 받을 수 있게 됨 */}
//       <EmojiList emojis={emojiJson} keyword={keyword} />
//     </div>
//   );
// }

// export default App;

/*import { Todo } from './components/56/Todo';

function App() {
  return <Todo />;
}

export default App;
*/

// function App() {
//   return <Pagination defaultPage={0} limit={10} total={50} />;
// }

// export default App;

import { Routes, Route } from 'react-router';
import DefaultTemplate from './components/60/Axios/template/DefaultTemplate';
import { PostsPage, PostPage, NotFoundPage } from './components/60/Axios/Page';

const App = () => {
  return (
    <DefaultTemplate>
      <Routes>
        <Route path='/' element={<h1>home</h1>}></Route>
        <Route path='/posts' element={<PostsPage />}></Route>
        <Route path='/posts/:postId' element={<PostPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </DefaultTemplate>
  );
};

export default App;
// 동적인 path를 정하려면 :파라미터이름
// 그러면  :파라미터이름 이걸로 안쪽에서 받을 수 있다.(PostPage)
// * 와일드카드로 지정 404 페이지 유도 대신 젤 마지막에
