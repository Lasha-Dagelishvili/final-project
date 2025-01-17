import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const { t } = useTranslation();
  
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();


  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        {t('not_found')}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {t('page_doesnot_exist')}
      </p>
      <button
        onClick={() => navigate(`/${lang}`)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md transition"
      >
        {t('go_back_home')}
      </button>
    </section>
  );
};

export default NotFoundPage;
