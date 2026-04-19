import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import { LoginForm } from "./login-form";

const push = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

vi.mock("@/features/auth/api/login-request", () => ({
  loginRequest: vi.fn(() =>
    Promise.resolve({ user: { id: "1", email: "dev@example.com" } }),
  ),
}));

vi.mock("@/shared/lib/toast/client-toast", () => ({
  clientToast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    push.mockClear();
    refresh.mockClear();
  });

  it("submits valid credentials via form fields", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "dev@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/");
    });
  });
});
