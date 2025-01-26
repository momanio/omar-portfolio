import { MainLayout } from "../layouts/MainLayout";

import { RouteConfig } from "../types/route";

export const ROUTES = {
  HOME: "/",
  PROJECTS: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  ABOUT: "/about",
  CONTACT: "/contact",
} as const;

export const routeConfig: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: MainLayout,
  },
];
