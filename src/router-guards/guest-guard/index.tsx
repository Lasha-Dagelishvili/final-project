import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const GuestGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

export default GuestGuard;
