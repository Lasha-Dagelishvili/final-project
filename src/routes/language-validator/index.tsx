import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserRoutes from '../AppRoutes/UserRoutes';

const supportedLanguages = ['en', 'ka'];

const LanguageValidator = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  if (!lang || !supportedLanguages.includes(lang)) {
    return <Navigate to={`/${supportedLanguages[0]}`} replace />;
  }

  return <UserRoutes />;
};

export default LanguageValidator;
