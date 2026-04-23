import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ─────────────────────────────────────────────
// Lazy page imports
// ─────────────────────────────────────────────

const HomePage = lazy(() => import("./pages/HomePage"));
const FormPage = lazy(() => import("./pages/FormPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));

// ─────────────────────────────────────────────
// Page suspense wrapper
// ─────────────────────────────────────────────

function PageFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="text-2xl animate-pulse">⚡</div>
        <p className="text-xs text-muted-foreground font-mono">Cargando...</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Route definitions
// ─────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <Outlet />
    </Suspense>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const formNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/proyecto/nuevo",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <FormPage />
    </Suspense>
  ),
});

const formEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/proyecto/$projectId",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <FormPage />
    </Suspense>
  ),
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/proyecto/$projectId/resultados",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ResultsPage />
    </Suspense>
  ),
});

const reportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/proyecto/$projectId/informe",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ReportPage />
    </Suspense>
  ),
});

// ─────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  homeRoute,
  formNewRoute,
  formEditRoute,
  resultsRoute,
  reportRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
