import { useAuth } from './hooks/useAuth.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';

// const memoryHistory = createMemoryHistory({
//   initialEntries: ['/'],
// });

const router = createRouter({ routeTree, context: undefined! });
// const router = createRouter({ routeTree, history: memoryHistory });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={auth} />;
}
