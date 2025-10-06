import {
  createRouter,
  RouterProvider,
  Route,
  RootRoute,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";

const queryClient = new QueryClient();

// Root layout route
const rootRoute = new RootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  ),
});

// Define routes
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharacterList,
});

const characterDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/character/$id",
  component: CharacterDetails,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  characterDetailsRoute,
]);

// Create router
export const router = createRouter({ routeTree });

// Register the router type for automatic inference
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Export provider
export const AppRouter = () => <RouterProvider router={router} />;
