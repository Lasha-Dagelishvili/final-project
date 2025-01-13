import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace state={{ message: 'Please log in to access this page' }} />;
  }

  return children;
};

export default ProtectedRoute;
