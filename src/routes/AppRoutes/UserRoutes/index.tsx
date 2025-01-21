import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { ROUTES, PAGES } from '@/routes/routesConfig';
import Layout from '@/layout/mainLeyout/layout';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/router-guards/protected-route';
import GuestGuard from '@/router-guards/guest-guard';

const {
  Home,
  Login,
  Register,
  Profile,
  NotFound,
  ProductsPage,
  SuccessPage,
  CancelPage,
  Contact
} = PAGES;

const UserRoutes = () => {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <Routes>
      <Route
        path={ROUTES.SUCCESS}
        element={
          <Layout>
            <SuccessPage />
          </Layout>
        }
      />
      <Route
        path={ROUTES.CANCEL}
        element={
          <Layout>
            <CancelPage />
          </Layout>
        }
      />
      <Route
        path={ROUTES.HOME}
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <Layout>
            <GuestGuard>
              <Login />
            </GuestGuard>
          </Layout>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <Layout>
            <GuestGuard>
              <Register />
            </GuestGuard>
          </Layout>
        }
      />
      {user && (
        <Route
          path={ROUTES.PROFILE}
          element={
            <Layout>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Layout>
          }
        />
      )}
      <Route
        path={ROUTES.NOT_FOUND}
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
      <Route
        path={ROUTES.PRODUCTS}
        element={
          <Layout>
            <ProductsPage />
          </Layout>
        }
      />
      <Route path={ROUTES.CONTACT}
        element={
          <Layout>
            <Contact />
          </Layout>
        } 
      />
    </Routes>
  );
};

export default UserRoutes;
