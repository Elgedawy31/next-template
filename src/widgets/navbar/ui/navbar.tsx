"use client";

import Link from "next/link";
import { Button } from "@/shared/ui";

export function Navbar() {
  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-foreground font-semibold tracking-tight">
          Next Template
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
