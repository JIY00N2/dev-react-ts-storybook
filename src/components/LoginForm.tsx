import useForm, { FormErrors } from '../hooks/useForm';

type LoginValues = {
  name: string;
  password: string;
};

const LoginForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { errors, handleChange, handleSubmit } = useForm<LoginValues>({
    initialValues: { name: '', password: '' },
    onSubmit,
    validate: ({ name, password }) => {
      const newErrors: FormErrors<LoginValues> = {};
      if (name === '') newErrors.name = '이름을 입력하세요';
      if (password === '') newErrors.password = '비밀번호를 입력하세요';
      return newErrors;
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <span>{errors.name}</span>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <span>{errors.password}</span>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
