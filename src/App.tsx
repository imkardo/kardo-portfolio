import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Cta } from "@/components/sections/cta";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { Resume } from "@/components/sections/resume";
import { Services } from "@/components/sections/services";
import { Stacks } from "@/components/sections/stacks";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { LanguageProvider } from "@/lib/i18n";
import { SiteDataProvider } from "@/lib/site-data";

const Admin = lazy(() => import("@/pages/Admin"));

function Site() {
  return (
    <ErrorBoundary surface="site">
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Stacks />
        <Process />
        <Projects />
        <Gallery />
        <Resume />
        <Cta />
        <Contact />
      </main>
      <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SiteDataProvider>
        <HashRouter>
          <Routes>
            <Route
              path="/admin"
              element={
                <ErrorBoundary surface="admin">
                  <Suspense fallback={<div className="p-8 text-center">Loading admin…</div>}>
                    <Admin />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<Site />} />
          </Routes>
        </HashRouter>
        </SiteDataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
