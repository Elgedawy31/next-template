import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui";

export function HomeView() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Home</CardTitle>
          <CardDescription>
            This page uses the views layer, shared UI, and layout widgets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Sign in via the mock auth flow to set a session cookie and access
            protected routes.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
