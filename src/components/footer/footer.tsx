import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} {t('MyWebsite')}</p>
      </div>
    </footer>
  );
};

export default Footer;
