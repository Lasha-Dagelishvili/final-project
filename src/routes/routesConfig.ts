import { lazy } from 'react';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  NOT_FOUND: '*',
  PRODUCTS: '/products'
};

export const PAGES = {
  Home: lazy(() => import('@/pages/home/home')),
  Login: lazy(() => import('@/pages/auth/login')),
  Register: lazy(() => import('@/pages/auth/register')),
  Profile: lazy(() => import('@/pages/profile')),
  NotFound: lazy(() => import('@/pages/not-found')),
  ProductsPage: lazy(() => import('@/pages/products/products-page')),
};
