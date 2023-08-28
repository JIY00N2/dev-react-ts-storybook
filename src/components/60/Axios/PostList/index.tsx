// Post 목록을 받아서 뿌려주기
import { Post } from '..';
import PostItem from '../PostItem';
import usePostContext from '../contexts/usePostContext';

const PostList = () => {
  const { posts } = usePostContext();
  return (
    <ul>
      {posts.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
