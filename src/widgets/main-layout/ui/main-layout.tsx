import { Footer } from "@/widgets/footer";
import { Navbar } from "@/widgets/navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </>
  );
}
