import { useForm } from "react-hook-form";
import { useAuthQuery } from "../hooks/useAuthQuery";

interface RegisterForm {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const { authenticate } = useAuthQuery();

  const onSubmit = async (data: RegisterForm) => {
    await authenticate({
      url: "/auth/register",
      data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
