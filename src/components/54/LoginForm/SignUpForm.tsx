import useForm, { FormErrors } from '~/hooks/useForm';
import Button from './Button';
import CardForm from './CardForm';
import ErrorText from './ErrorText';
import Input from './LoginInput';
import Title from './Title';

type SignUpValues = {
  name: string;
  password: string;
  passwordConfirm: string;
};

const SignUpForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { errors, isLoading, handleChange, handleSubmit } =
    useForm<SignUpValues>({
      initialValue: {
        name: '',
        password: '',
        passwordConfirm: '',
      },
      onSubmit,
      validate: ({ name, password, passwordConfirm }) => {
        const newErrors: FormErrors<SignUpValues> = {};
        if (!name) {
          newErrors.name = '이름을 입력해주세요';
        }
        if (!password) {
          newErrors.password = '비밀번호를 입력해주세요';
        }
        console.log(passwordConfirm);
        if (!passwordConfirm) {
          newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요';
        } else if (password !== passwordConfirm) {
          newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
        }
        return newErrors;
      },
    });

  return (
    <CardForm onSubmit={handleSubmit}>
      <Title>SignUp</Title>
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
      <Input
        type='password'
        name='passwordConfirm'
        placeholder='Password Confirm'
        onChange={handleChange}
        style={{ marginTop: 8 }}
      />
      {errors.passwordConfirm && (
        <ErrorText>{errors.passwordConfirm}</ErrorText>
      )}
      {/* 로딩이 되는 도중에는 클릭이 안되도록 disabled={isLoading} */}
      <Button type='submit' disabled={isLoading} style={{ marginTop: 16 }}>
        SignUp
      </Button>
    </CardForm>
  );
};

export default SignUpForm;
