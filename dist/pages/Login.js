import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import useAuthQuery from '../hooks/useAuthQuery';
const Login = () => {
    const { register, handleSubmit } = useForm();
    const { login } = useAuthQuery();
    const onSubmit = async (data) => {
        await login(data);
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx("label", { children: "Email" }), _jsx("input", { ...register('email') }), _jsx("label", { children: "Password" }), _jsx("input", { type: "password", ...register('password') }), _jsx("button", { type: "submit", children: "Login" })] }));
};
export default Login;
