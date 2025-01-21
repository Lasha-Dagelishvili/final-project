import React from 'react';
import { useTranslation } from 'react-i18next';

const CancelPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-red-600">{t('canceled')}</h1>
    </div>
  );
};

export default CancelPage;
