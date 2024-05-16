import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { routeTree } from './routeTree.gen';
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
