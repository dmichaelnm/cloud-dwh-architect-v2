import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // ---------------------------------------------------------------------------
  // Authentication Layout
  // ---------------------------------------------------------------------------
  {
    path: '/auth',
    component: () => import('layouts/AuthenticationLayout.vue'),
    children: [
      // Login Page
      {
        path: 'login',
        component: () => import('pages/auth/LoginPage.vue'),
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Main Layout
  // ---------------------------------------------------------------------------
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },

  // ---------------------------------------------------------------------------
  // Error Page
  // ---------------------------------------------------------------------------
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
