import Input from './LoginInput';
import Button from './Button';
import ErrorText from './ErrorText';
import CardForm from './CardForm';
import Title from './Title';
import useForm, { FormErrors } from '~/hooks/useForm';

// sleep이 실행되면, 1초가 지난 다음에 Promise가 resolve 됨
/*const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};
*/

type LoginValues = {
  name: string;
  password: string;
};

const LoginForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { errors, isLoading, handleChange, handleSubmit } =
    useForm<LoginValues>({
      initialValue: {
        name: '',
        password: '',
      },
      // onSubmit 외부로부터 주입 받음
      onSubmit,
      validate: ({ name, password }) => {
        const newErrors: FormErrors<LoginValues> = {};
        if (!name) {
          newErrors.name = '이름을 입력해주세요';
        }
        if (!password) {
          newErrors.password = '비밀번호를 입력해주세요';
        }
        return newErrors;
      },
    });

  return (
    <CardForm onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input
        type='text'
        name='name'
        placeholder='Name'
        onChange={handleChange}
      />
      {errors.name && <ErrorText>{errors.name}</ErrorText>}
      <Input
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
        style={{ marginTop: 8 }}
      />
      {errors.password && <ErrorText>{errors.password}</ErrorText>}
      {/* 로딩이 되는 도중에는 클릭이 안되도록 disabled={isLoading} */}
      <Button type='submit' disabled={isLoading} style={{ marginTop: 16 }}>
        Login
      </Button>
    </CardForm>
  );
};

export default LoginForm;
