import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // Keep public content fresh without refetching on every section visit.
      gcTime: 60 * 60 * 1000,
      retry: 1,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
    },
  },
});
