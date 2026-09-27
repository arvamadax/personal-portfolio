import { Nav } from "@/components/Nav";
import { Terminal } from "@/components/Terminal";
import { Footer } from "@/components/Contact";
import { PageTransition } from "@/components/PageTransition";
import { LangProvider } from "@/lib/i18n";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <div className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-ui focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent">
          Skip to content
        </a>
        <Nav />
        <Terminal />
        <PageTransition />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </div>
    </LangProvider>
  );
}
