import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { apiClient } from "../api";
import jwtDecode from "jwt-decode";
const TwoFactorAuth = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];
            const payload = jwtDecode(token);
            await apiClient.post("/auth/verify-2fa", {
                userId: payload.userId,
                twoFactorCode: data.code,
            });
        }
        catch (error) {
            console.error("2FA verification failed:", error);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "max-w-md mx-auto mt-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Verify Two-Factor Authentication" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "code", className: "block text-gray-700", children: "2FA Code" }), _jsx("input", { id: "code", ...register("code", { required: "2FA code is required" }), className: "w-full p-2 border rounded" }), errors.code && _jsx("p", { className: "text-red-500", children: errors.code.message })] }), _jsx("button", { type: "submit", className: "w-full p-2 bg-blue-600 text-white rounded", children: "Verify" })] }));
};
export default TwoFactorAuth;
