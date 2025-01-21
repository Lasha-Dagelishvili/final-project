import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loading } from '@/router-guards/loading';
import LanguageValidator from '../language-validator';

const AppRoutes = () => {
  const { i18n } = useTranslation();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${i18n.language}`} replace />}
        />

        <Route path="/:lang/*" element={<LanguageValidator />} />

        <Route
          path="*"
          element={<Navigate to={`/${i18n.language}`} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
