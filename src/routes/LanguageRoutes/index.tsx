import { Routes, Route, useParams } from 'react-router-dom';
import Home from '@/pages/home/home';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import Layout from '@/layout/mainLeyout/layout';
import { useTranslation } from 'react-i18next';
import Profile from '@/pages/profile';

const LanguageRoutes = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  if (lang !== i18n.language) {
    i18n.changeLanguage(lang);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
    </Routes>
  );
};

export default LanguageRoutes;
