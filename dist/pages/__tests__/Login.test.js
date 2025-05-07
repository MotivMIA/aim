import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';
import { apiClient } from '../../api';
jest.mock('../../api', () => ({
    apiClient: {
        post: jest.fn().mockResolvedValue({ data: { token: 'mock-token' } }),
    },
}));
test('renders login form and submits', async () => {
    render(_jsx(Login, {}));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/login/i));
    await waitFor(() => {
        expect(apiClient.post).toHaveBeenCalledWith('/api/v1/auth/login', {
            email: 'test@example.com',
            password: 'password123',
        });
    });
});
