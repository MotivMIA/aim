import { useForm } from "react-hook-form";
import { apiClient } from "../api";
import jwtDecode from "jwt-decode";

interface TwoFactorForm {
  code: string;
}

const TwoFactorAuth: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TwoFactorForm>();

  const onSubmit = async (data: TwoFactorForm) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const payload = jwtDecode<{ userId: string }>(token!);
      await apiClient.post("/auth/verify-2fa", {
        userId: payload.userId,
        twoFactorCode: data.code,
      });
    } catch (error) {
      console.error("2FA verification failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Verify Two-Factor Authentication</h1>
      <div className="mb-4">
        <label htmlFor="code" className="block text-gray-700">2FA Code</label>
        <input
          id="code"
          {...register("code", { required: "2FA code is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.code && <p className="text-red-500">{errors.code.message}</p>}
      </div>
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
        Verify
      </button>
    </form>
  );
};

export default TwoFactorAuth;
