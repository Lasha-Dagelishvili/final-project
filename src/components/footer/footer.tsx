import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-100 p-4 text-center">
      <div className="container mx-auto text-center">
        <p>
          © {new Date().getFullYear()} {t('MyWebsite')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
