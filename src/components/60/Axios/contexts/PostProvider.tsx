import { useCallback, useReducer, useEffect, createContext } from 'react';
import { Post } from '..';
// 삭제하려고 index -> PostList -> PostItem props drilling 현상 발생
// 따라서 context를 이용해서 비동기 호출을 제어하고 데이터도 관리

type PostContextType = {
  posts: Post[];
  onAddPost: (post: Post) => Promise<void>;
  onDeletePost: (id: number) => Promise<void>;
};

export const PostContext = createContext<PostContextType | null>(null);

type Action =
  | { type: 'INIT_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: { id: number } };

// reducer는 async, await를 통한 네트워크 호출이 불가능하다.
// reducer는 최대한 순수해야 한다.
const reducer = (state: Post[], action: Action): Post[] => {
  switch (action.type) {
    case 'INIT_POSTS': {
      return action.payload;
    }
    case 'ADD_POST': {
      return [...state, action.payload];
    }
    case 'DELETE_POST': {
      const payload = action.payload;
      return state.filter((item) => item.id !== payload.id);
    }
    default: {
      console.error('wrong type');
      return state;
    }
  }
};

type PostProviderProps = {
  children: React.ReactNode;
  initialPosts: Post[];
  handleAddPost: (post: Post) => Promise<Post>;
  handleDeletePost: (id: number) => Promise<{ id: number }>;
};

const PostProvider = ({
  children,
  initialPosts,
  handleAddPost,
  handleDeletePost,
}: PostProviderProps) => {
  // useReducer는 useState와 유사하지만 조금 다른점이 있다.
  // dispatch에 따라 상태를 업데이트
  const [posts, dispatch] = useReducer(reducer, initialPosts || []);

  useEffect(() => {
    dispatch({ type: 'INIT_POSTS', payload: initialPosts || [] });
  }, [initialPosts]);

  const onAddPost = useCallback(
    async (post: Post) => {
      const payload = await handleAddPost(post);
      dispatch({ type: 'ADD_POST', payload });
    },
    [handleAddPost]
  );

  // APP에서 handleDeletePost 받아와서
  const onDeletePost = useCallback(
    async (id: number) => {
      const payload = await handleDeletePost(id);
      dispatch({ type: 'DELETE_POST', payload });
    },
    [handleDeletePost]
  );

  return (
    // Provider로 onDeletePost 넘기기
    <PostContext.Provider value={{ posts, onAddPost, onDeletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
