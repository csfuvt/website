import { createRootRoute, Outlet } from '@tanstack/react-router';
import { KFooter } from './-components/KFooter/KFooter.tsx';
import { KHeader } from './-components/KHeader/KHeader.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <KHeader />
      <Outlet />
      <KFooter />
      {/*<TanStackRouterDevtools />*/}
    </>
  ),
});
