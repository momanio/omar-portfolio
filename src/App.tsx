import { lazy, Suspense, type ComponentType } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RouteEffects } from "./components/navigation/RouteEffects";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NotFound } from "./pages/not-found/NotFound";
import { RouteMetadata } from "./components/RouteMetadata";
import "./App.css";

const ProjectStudyPage = lazy(() => import("./pages/projects/ProjectStudyPage"));

export function App({ StudyPage = ProjectStudyPage }: { StudyPage?: ComponentType } = {}) {
  return <Router>
    <Navbar />
    <main id="main-content" tabIndex={-1}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={
            <Suspense fallback={<div className="study-page" role="status">Loading case study…</div>}>
              <StudyPage />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </main>
    <Footer /><RouteEffects /><RouteMetadata />
  </Router>;
}
