import axios from 'axios';
import Header from '~/components/55/Header';
import Spinner from '~/components/55/Spinner';
import useAsync from '~/hooks/Async/useAsync';
import { useCallback } from 'react';
import PostAddForm from '../PostAddForm';
import PostList from '../PostList';
import PostProvider from '../contexts/PostProvider';

// 홈화면, PostList 화면, PostDetail화면으로 react-router를 통해 나누어보자

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/*
컴포넌트는 최대한 순수할수록 좋다.
1. 사이드 이펙트를 걱정하지 않아도 됩니다.
2. 확장에 유연합니다.
3. 테스트가 쉽습니다.
 */
// useAsync 훅을 이용한 비동기 호출
// state: State<Awaited<ReturnType<T>>>
const PostsPage = () => {
  const initialPosts = useAsync(
    async () => {
      return await axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.data);
    },
    [],
    []
  );

  // 1. App에서 함수를 만들어서 prop으로 내려준다 ->  지저분해짐
  // 2. PostProvider에다가 함수들을 넣어줘서 provider 내에서 함수를 실행시키도록 만들기

  // post 추가
  const handleAddPost = useCallback(async (post: Post) => {
    return await axios
      .post('https://jsonplaceholder.typicode.com/posts', post)
      .then((response) => response.data);
  }, []);

  // id 값을 받아서 삭제하는 api 호출
  const handleDeletePost = useCallback(async (id: number) => {
    return await axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => ({ id }));
  }, []);

  return (
    <PostProvider
      initialPosts={initialPosts.value}
      handleDeletePost={handleDeletePost}
      handleAddPost={handleAddPost}
    >
      <div>
        <Header>Posts</Header>
        <PostAddForm />
        {initialPosts.isLoading ? <Spinner /> : <PostList />}
      </div>
    </PostProvider>
  );
};

export default PostsPage;
