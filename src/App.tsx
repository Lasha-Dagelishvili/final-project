import { Routes, Route, Navigate } from 'react-router-dom';
import LanguageRoutes from './routes/LanguageRoutes';
import Layout from './layout/mainLeyout/layout';
import Profile from './pages/profile';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang/*" element={<LanguageRoutes />} />
      {user && (
        <Route
          path="/profile"
          element={
              <Layout>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </Layout>
          }
        />
      )}

    </Routes>
  );
};

export default App;
