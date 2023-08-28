import Header from '~/components/55/Header';
import { useState, useCallback } from 'react';
import Spinner from '~/components/55/Spinner';
import usePostContext from '../contexts/usePostContext';
import { Post } from '../Page/PostsPage';
import { Link } from 'react-router-dom';

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
      <Link to={`/posts/${post.id}`}>Detail{'>'} </Link>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        )}
      </div>
    </li>
  );
};

export default PostItem;
