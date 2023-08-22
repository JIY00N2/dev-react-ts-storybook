import { Meta, StoryObj } from '@storybook/react';
import useForm from '~/hooks/useForm';

const meta: Meta<typeof useForm> = {
  title: 'Hook/useForm',
  tags: ['autdodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 로딩을 확인하기 위해 비동기 함수 작성
const sleep = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

type Errors = {
  [key: string]: string;
};

const UseFormHook = () => {
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValue: { email: '', password: '' },
    // submit이 되면 value들 보여주기
    onSubmit: async (values) => {
      await sleep();
      alert(JSON.stringify(values));
    },
    validate: ({ email, password }) => {
      const errors: Errors = {};

      if (!email) errors.email = '이메일을 입력해주세요';
      if (!password) errors.password = '비밀번호를 입력해주세요';
      if (!/^.+@.+\..+$/.test(email))
        errors.email = '올바른 이메일을 입력해주세요';

      return errors;
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div>
        <input
          name='email'
          type='email'
          placeholder='Email'
          onChange={handleChange}
        />
        {errors.email}
      </div>
      <div>
        <input
          name='password'
          type='password'
          placeholder='Password'
          onChange={handleChange}
        />
        {errors.password}
      </div>
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit!'}
      </button>
    </form>
  );
};

// Formik 라이브러리
export const Default: Story = {
  render: () => <UseFormHook />,
};
