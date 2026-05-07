import { createRootRoute, createRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth-store';
import { AppLayout } from '@/components/layout/app-layout';
import { WalletAuthPage } from '@/routes/index';
import { DashboardPage } from '@/routes/_authenticated/dashboard';
import { EngagementsPage } from '@/routes/_authenticated/engagements';
import { AttestationsPage } from '@/routes/_authenticated/attestations';
import { MMProfilesPage } from '@/routes/_authenticated/mm-profiles';
import { ProfilePage } from '@/routes/_authenticated/profile';

const rootRoute = createRootRoute({
  component: Outlet,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WalletAuthPage,
});

function AuthenticatedLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthorized()) {
      throw redirect({ to: '/' });
    }
  },
  component: AuthenticatedLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const engagementsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/engagements',
  component: EngagementsPage,
});

const attestationsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/attestations',
  component: AttestationsPage,
});

const mmProfilesRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/mm-profiles',
  component: MMProfilesPage,
});

const profileRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/profile',
  component: ProfilePage,
});

const authenticatedTree = authenticatedRoute.addChildren([
  dashboardRoute,
  engagementsRoute,
  attestationsRoute,
  mmProfilesRoute,
  profileRoute,
]);

export const routeTree = rootRoute.addChildren([indexRoute, authenticatedTree]);
