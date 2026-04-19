import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "@/shared/ui";

describe("Skeleton", () => {
  it("renders pulse placeholder with data-slot", () => {
    render(<Skeleton className="h-8 w-48" data-testid="sk" />);
    const el = screen.getByTestId("sk");
    expect(el).toHaveAttribute("data-slot", "skeleton");
    expect(el.className).toMatch(/animate-pulse/);
  });
});
