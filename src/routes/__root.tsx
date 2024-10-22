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
  notFoundComponent: () => {
    return (
      <center>
        <div className="centered">
          <h1>404 - Pagina nu a fost găsită</h1>
          <p>Scuze, dar nu am găsit pagina căutată de tine.</p>
        </div>
        <style>{`
            .centered {
              position: absolute;
              top: 50%;
              left: 50%;
              margin-right: -50%;
              transform: translate(-50%, -50%);
            }
          `}</style>
      </center>
    );
  },
});
