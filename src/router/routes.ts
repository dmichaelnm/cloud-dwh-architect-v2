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
      // Register Account Page
      {
        path: 'register',
        component: () => import('pages/auth/RegisterPage.vue'),
      },
      // Reset Password Page
      {
        path: 'reset',
        component: () => import('pages/auth/ResetPage.vue'),
      }
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
