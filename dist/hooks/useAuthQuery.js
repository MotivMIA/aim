import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api";
const useAuthQuery = () => {
    const navigate = useNavigate();
    const authMutation = useMutation({
        mutationFn: async ({ url, data }) => {
            const response = await apiClient.post(url, data);
            return response.data;
        },
        onSuccess: (data) => {
            if (data.requiresTwoFactor) {
                navigate("/2fa");
            }
            else {
                navigate("/dashboard");
            }
        },
        onError: (error) => {
            console.error("Authentication failed:", error.response?.data?.message);
        },
    });
    return { authenticate: authMutation.mutateAsync };
};
export default useAuthQuery;
