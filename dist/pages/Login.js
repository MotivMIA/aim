import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useAuthQuery } from "../hooks/useAuthQuery";
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { authenticate } = useAuthQuery();
    const onSubmit = async (data) => {
        await authenticate({
            url: "/auth/login",
            data,
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "max-w-md mx-auto mt-8", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block text-gray-700", children: "Email" }), _jsx("input", { id: "email", type: "email", ...register("email", { required: "Email is required" }), className: "w-full p-2 border rounded" }), errors.email && _jsx("p", { className: "text-red-500", children: errors.email.message })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "password", className: "block text-gray-700", children: "Password" }), _jsx("input", { id: "password", type: "password", ...register("password", { required: "Password is required" }), className: "w-full p-2 border rounded" }), errors.password && _jsx("p", { className: "text-red-500", children: errors.password.message })] }), _jsx("button", { type: "submit", className: "w-full p-2 bg-blue-600 text-white rounded", children: "Login" })] }));
};
export default Login;
