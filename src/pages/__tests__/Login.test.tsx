import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";

jest.mock("../../api", () => ({
  apiClient: {
    post: jest.fn().mockResolvedValue({ data: { token: "mock-token" } }),
  },
}));

test("renders login form and submits", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(require("../../api").apiClient.post).toHaveBeenCalled();
});
