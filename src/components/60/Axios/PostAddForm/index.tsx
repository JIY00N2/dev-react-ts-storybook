import Spinner from '~/components/55/Spinner';
import useForm from '~/hooks/useForm';
import usePostContext from '../contexts/usePostContext';
import { Post } from '..';

type Errors = {
  title?: string;
  body?: string;
};

const PostAddForm = () => {
  const { onAddPost } = usePostContext();

  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValue: {
      userId: 1,
      id: 1,
      title: '',
      body: '',
    },
    // usePostContext에서 받아온 onAddPost 사용
    onSubmit: async (values: Post) => {
      await onAddPost(values);
    },
    validate: ({ title, body }) => {
      const errors: Errors = {};
      if (!title) errors.title = '제목을 입력해주세요';
      if (!body) errors.body = '내용을 입력해주세요';
      return errors;
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type='text' name='title' onChange={handleChange} />
        {errors.title}
      </div>
      <div>
        <input type='text' name='body' onChange={handleChange} />
        {errors.body}
      </div>
      {isLoading ? <Spinner /> : <button type='submit'>Add</button>}
    </form>
  );
};

export default PostAddForm;
