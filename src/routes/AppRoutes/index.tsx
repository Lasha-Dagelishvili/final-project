import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserRoutes from './UserRoutes';

const AppRoutes = () => {
  const { i18n } = useTranslation();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${i18n.language}`} replace />} />
      <Route path="/:lang/*" element={<UserRoutes />} />
      <Route path="*" element={<Navigate to={`/${i18n.language}`} replace />} />
    </Routes>
  );
};

export default AppRoutes;
