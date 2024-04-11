/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as IndexRouteImport } from './routes/index/route';

// Create/Update Routes

const IndexRouteRoute = IndexRouteImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexRouteImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([IndexRouteRoute]);

/* prettier-ignore-end */
