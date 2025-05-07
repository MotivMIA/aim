import { useForm } from 'react-hook-form';
import useAuthQuery from '../hooks/useAuthQuery';

type RegisterForm = {
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const { register: registerUser } = useAuthQuery();

  const onSubmit = async (data: RegisterForm) => {
    await registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register('email')} />
      <label>Password</label>
      <input type="password" {...register('password')} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
