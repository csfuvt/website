import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import axios from 'axios';
import { AuthContextProvider } from './auth.context.tsx';
import { InnerApp } from './router.tsx';
import { BASE_URL } from './constants.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const localStorageJwt = localStorage.getItem('jwt');
if (localStorageJwt) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorageJwt}`;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
          <ToastContainer />
        </QueryClientProvider>
      </AuthContextProvider>
    </Suspense>
  </React.StrictMode>
);
