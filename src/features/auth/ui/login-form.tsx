"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  type LoginSchema,
} from "@/features/auth/lib/login-schema";
import { loginRequest } from "@/features/auth/api/login-request";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { isAppError } from "@/shared/lib/errors";
import { clientToast } from "@/shared/lib/toast/client-toast";
import { logger } from "@/shared/utils/logger";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormPasswordField,
  FormTextField,
} from "@/shared/ui";

export function LoginForm() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore((s) => s);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginSchema) {
    try {
      const { user, token: responseToken } = await loginRequest(values);
      const token = user.token ?? responseToken ?? null;

      setUser(user);
      setToken(token);

      clientToast.success("Signed in successfully.");
      router.push("/");
      router.refresh();
    } catch (e) {
      if (isAppError(e)) {
        clientToast.error(e.message);
        return;
      }
      logger.error(e);
      clientToast.error("Sign-in failed.");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Use any email and password for the mock API.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormTextField
              control={form.control}
              name="email"
              label="Email"
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
            />
            <FormPasswordField
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••••"
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
