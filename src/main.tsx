import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { routeTree } from './routeTree.gen';
import './i18n';
//import { Suspense } from 'react';
//import { useTransition } from 'react';

import {
  // createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

// const memoryHistory = createMemoryHistory({
//   initialEntries: ['/'],
// });

const router = createRouter({ routeTree });
// const router = createRouter({ routeTree, history: memoryHistory });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
