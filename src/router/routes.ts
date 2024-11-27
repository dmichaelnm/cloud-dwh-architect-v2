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
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Main Layout
  // ---------------------------------------------------------------------------
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Project Overview Page
      {
        path: 'project/overview',
        component: () => import('pages/project/ProjectOverviewPage.vue'),
      },
      // Project Editor Page
      {
        path: 'project/editor',
        component: () => import('pages/project/ProjectEditorPage.vue'),
      },
      // External Application Overview Page
      {
        path: 'externalApp/overview',
        component: () => import('pages/extapp/ExternalAppOverviewPage.vue'),
      },
      // External Application Editor Page
      {
        path: 'externalApp/editor',
        component: () => import('pages/extapp/ExternalAppEditorPage.vue'),
      },
    ],
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
