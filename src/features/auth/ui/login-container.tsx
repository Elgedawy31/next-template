"use client";

import { LoginForm } from "./login-form";

export function LoginContainer() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <LoginForm />
    </div>
  );
}
