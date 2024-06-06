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

import './i18n';
import axios from 'axios';
import { AuthContextProvider } from './auth.context.tsx';
import { InnerApp } from './router.tsx';


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const localStorageJwt = localStorage.getItem('jwt');
if (localStorageJwt) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorageJwt}`;
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>

      <RouterProvider router={router} />

      <AuthContextProvider>
        <InnerApp />
      </AuthContextProvider>

    </Suspense>
  </React.StrictMode>
);
