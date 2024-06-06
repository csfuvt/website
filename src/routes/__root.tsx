import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { KFooter } from './-components/KFooter/KFooter.tsx';
import { KHeader } from './-components/KHeader/KHeader.tsx';
import { AuthContextProps } from '../auth.context.tsx';

export const Route = createRootRouteWithContext<AuthContextProps>()({
  component: () => (
    <>
      <KHeader />
      <Outlet />
      <KFooter />
      {/*<TanStackRouterDevtools />*/}
    </>
  ),
});
