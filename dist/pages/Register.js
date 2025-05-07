import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import useAuthQuery from '../hooks/useAuthQuery';
const Register = () => {
    const { register, handleSubmit } = useForm();
    const { register: registerUser } = useAuthQuery();
    const onSubmit = async (data) => {
        await registerUser(data);
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx("label", { children: "Email" }), _jsx("input", { ...register('email') }), _jsx("label", { children: "Password" }), _jsx("input", { type: "password", ...register('password') }), _jsx("button", { type: "submit", children: "Register" })] }));
};
export default Register;
