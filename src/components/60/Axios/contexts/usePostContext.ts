import { useContext } from 'react';
import { PostContext } from './PostProvider';

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext는 PostProvider와 함께 사용해야 합니다.');
  }
  return context;
};

export default usePostContext;
