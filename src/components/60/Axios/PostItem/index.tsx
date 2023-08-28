import Header from '~/components/55/Header';
import Text from '~/components/55/Text';
import { useState, useCallback } from 'react';
import Spinner from '~/components/55/Spinner';
import { Post } from '..';
import usePostContext from '../contexts/usePostContext';

const PostItem = ({ post }: { post: Post }) => {
  // 로딩 상태 제어
  const [loading, setLoading] = useState(false);
  // usePostContext를 이용해서 onDeletePost 받아옴
  const { onDeletePost } = usePostContext();

  // 로딩 상태 제어하기
  const handleDeletePost = useCallback(
    async (id: number) => {
      setLoading(true);
      await onDeletePost(id);
      setLoading(false);
    },
    [onDeletePost]
  );

  return (
    <li>
      <Header strong level={3}>
        {post.title}
      </Header>
      <Text>{post.body}</Text>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        )}
      </div>
      {/* 버튼 클릭시 삭제 api 호출 */}
    </li>
  );
};

export default PostItem;
