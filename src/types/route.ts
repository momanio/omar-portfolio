export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  children?: RouteConfig[];
}
