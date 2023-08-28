import axios from 'axios';
import { Fragment } from 'react';
import { useParams } from 'react-router';
import Header from '~/components/55/Header';
import Text from '~/components/55/Text';
import Spinner from '~/components/55/Spinner';
import useAsync from '~/hooks/Async/useAsync';

// id 값을 받아서 useAsync를 이용해서 post 정보를 불러옴
const PostPage = () => {
  // useParams 훅으로 id값을 받을 수 있다.
  const { postId } = useParams();
  // 내용 불러오기
  const post = useAsync(
    async (postId: string) => {
      return await axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => res.data);
    },
    [postId],
    [postId]
  );

  return (
    <div>
      {post.isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Header strong>{post.value?.title}</Header>
          <Text>{post.value?.body}</Text>
        </Fragment>
      )}
    </div>
  );
};

export default PostPage;
