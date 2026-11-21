import { StrictMode, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./services/reactQueryClient";

import "./index.css";
import "./components/projects/projects.css";

function mount(StudyPage?: ComponentType) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}><App StudyPage={StudyPage} /></QueryClientProvider>
    </StrictMode>
  );
}

// Keep the prerendered article in view while its interactive code loads.
if (document.querySelector("#root .study-page")) {
  void import("./pages/projects/ProjectStudyPage").then(({ default: StudyPage }) => mount(StudyPage)).catch(() => mount());
} else {
  mount();
}
