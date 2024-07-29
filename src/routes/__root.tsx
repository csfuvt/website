import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { KFooter } from './-components/KFooter/KFooter.tsx';
import { KHeader } from './-components/KHeader/KHeader.tsx';
import { AuthContextProps } from '../auth.context.tsx';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    return (
      <center>
      <div>
        <h1>{t('404 - Pagina nu a fost găsită')}</h1>
        <p>{t('Scuze, dar nu am găsit pagina căutată de tine.')}</p>
      </div>
    </center>
    );
  },
});