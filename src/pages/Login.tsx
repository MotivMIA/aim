import { useForm } from 'react-hook-form';
import useAuthQuery from '../hooks/useAuthQuery';

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login } = useAuthQuery();

  const onSubmit = async (data: LoginForm) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register('email')} />
      <label>Password</label>
      <input type="password" {...register('password')} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
