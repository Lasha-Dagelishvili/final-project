import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Suspense, useEffect } from 'react';
import { ROUTES, PAGES } from '@/routes/routesConfig';
import Layout from '@/layout/mainLeyout/layout';
import ProtectedRoute from '@/router-guards/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/router-guards/loading';

const { Home, Login, Register, Profile, NotFound } = PAGES;

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
    <Suspense fallback={<Loading />}>
      <Routes>
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
              <Login />
            </Layout>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <Layout>
              <Register />
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
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
