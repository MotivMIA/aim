import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api";
import { AxiosError } from "axios";

interface AuthData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  requiresTwoFactor?: boolean;
}

const useAuthQuery = () => {
  const navigate = useNavigate();

  const authMutation = useMutation({
    mutationFn: async ({ url, data }: { url: string; data: AuthData }) => {
      const response = await apiClient.post<AuthResponse>(url, data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.requiresTwoFactor) {
        navigate("/2fa");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("Authentication failed:", error.response?.data?.message);
    },
  });

  return { authenticate: authMutation.mutateAsync };
};

export default useAuthQuery;
