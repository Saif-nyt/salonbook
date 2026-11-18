import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

function NavbarFallback() {
  return (
    <div aria-hidden className="border-b border-warm-taupe/35 bg-warm-cream/85">
      <div className="container-page h-[78px]" />
    </div>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
